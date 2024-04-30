import dotenv from "dotenv";
import {DbConnection} from "./DbConnection";
import {Event} from "../model/Event";
import {QueryResult} from "mysql2";

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
            throw err;
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
            throw err;
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
            throw err;
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
            throw err;
        }
    }
}