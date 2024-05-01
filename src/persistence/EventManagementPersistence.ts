import dotenv from "dotenv";
import {DbConnection} from "./DbConnection";
import {Event} from "../model/Event";
import {QueryResult, RowDataPacket} from "mysql2";
import {UserEvent} from "../model/UserEvent";
import { v4 as uuidv4 } from 'uuid';
import {ERROR_MESSAGES} from "../constant/ErrorMessages";

dotenv.config();
export class EventManagementPersistence {
    private connection: DbConnection;

    constructor() {
        this.connection = new DbConnection();
    }

    async getEvents(): Promise<QueryResult> {
        try {
            const pool = await this.connection.connect();
            const [results] = await pool.query(
                "select * from event;"
            );
            return results;
        } catch (err) {
            console.log(err)
            throw { error: ERROR_MESSAGES.getEvent };
        }
    }

    async getEvent(eventId: string): Promise<QueryResult> {
        try {
            const pool = await this.connection.connect();
            const [results] = await pool.execute(
                "select * from event where id = ? ;",
                [eventId]
            );
            return results;
        } catch (err) {
            console.log(err)
            throw { error: ERROR_MESSAGES.getEvent };
        }
    }

    async createEvent(event: Omit<Event, "id">): Promise<void>{
        try {
            const { name, date, address } = event;
            const pool = await this.connection.connect();
            await pool.execute(
                "insert into event (id, name, date, address) values (uuid() , ?, ?, ?)",
                [name, date, address]
            );
        } catch (err) {
            console.log(err);
            throw { error : ERROR_MESSAGES.createEvent };
        }
    }

    async updateEvent(eventId: string, event: Omit<Event, "id">): Promise<QueryResult> {
        try {
            const { name, date, address } = event;
            const pool = await this.connection.connect();
            const [results] = await pool.execute(
                "update event set name = ?, date = ?, address = ? where id = ?",
                [name, date, address, eventId]
            );
            return results;
        } catch (err) {
            console.log(err)
            throw { error: ERROR_MESSAGES.updateEvent };
        }
    }

    async registerUsersForAnEvent(userEvent: UserEvent[]): Promise<QueryResult> {
        try {
            const pool = await this.connection.connect();
            const formatValues = userEvent.map((userAndEvent)=> {
                return [uuidv4(), userAndEvent.eventId, userAndEvent.userId]
            })
            const [results] = await pool.query("insert into event_user (id, event_id, user_id) values ?", [formatValues]);
            return results;
        } catch (err) {
            console.log(err)
            throw { error: ERROR_MESSAGES.eventUserError };
        }
    }

    async importFromXlsx (data: string[][]) {
        try {
            const pool = await this.connection.connect();
            const [results] = await pool.query("insert into event (id, name, date, address) values ?", [data]);
            return results;
        } catch (err) {
            console.log(err)
            throw { error: ERROR_MESSAGES.fileUpload };
        }
    }
}