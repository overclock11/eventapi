import mysql, {Connection} from 'mysql2/promise';
import dotenv from "dotenv";

dotenv.config();

export class DbConnection {
    async connect (): Promise<Connection> {
        return mysql.createPool({
            host: process.env.HOST,
            port: parseInt(process.env.MYSQLPORT as string),
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE,
            waitForConnections: true,
            connectionLimit: 10,
            maxIdle: 10,
            idleTimeout: 60000,
            queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelay: 0,
        });
    }
}