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
            await this.validateIfExist(userEvent);
            const formatValues = userEvent.map((userAndEvent)=> {
                return [uuidv4(), userAndEvent.eventId, userAndEvent.userId]
            })
            const [results] = await pool.query("insert into event_user (id, event_id1, user_id1) values (?)", formatValues);
            return results;
        } catch (err) {
            console.log(err)
            throw err;
        }
    }

    //este método puede ajustarse
    private async validateIfExist (userEvent: UserEvent[]) {
        const events: string[]= [];
        const users: string[] = [];
        userEvent.forEach((userEvent)=>{
            events.push(`"${userEvent.eventId}"`);
            users.push(`"${userEvent.userId}"`);
        });

        const pool = await this.connection.connect();

        const [eventsRegistered] = await pool.query<RowDataPacket[]>(
            `select id from event where id in(${events.concat().toString()})`,
        );
        if (eventsRegistered.length < userEvent.length) {
            const notFoundValues: UserEvent[] = userEvent.filter(event => !(eventsRegistered as unknown as string[]).includes(event.eventId));
            const notFoundIds = notFoundValues.map((values)=>{
                return values.eventId;
            })
            throw { "error": `${ERROR_MESSAGES.invalidEventId} ${notFoundIds.concat()}` };
        }
        const [existingUsers] = await pool.query<RowDataPacket[]>(
            `select id from user where id in(${users.concat().toString()})`,
        );
        if (existingUsers.length < userEvent.length) {
            const notFoundValues = userEvent.filter(user => !(existingUsers as unknown as string[]).includes(user.userId));
            const notFoundIds = notFoundValues.map((values)=>{
                return values.userId;
            })
            throw { "error": `${ERROR_MESSAGES.invalidUserId} ${notFoundIds.concat()}` };
        }
        return;
    }
}