import {User} from "../model/User";
import {DbConnection} from "./DbConnection";
import md5 from "md5";
import {ERROR_MESSAGES} from "../constant/ErrorMessages";
import {QueryResult} from "mysql2";

export class UserPersistence {
    private connection: DbConnection;

    constructor() {
        this.connection = new DbConnection();
    }

    async createUser(user: User): Promise<void>{
        try {
            const { username, email } = user;
            const pool = await this.connection.connect();
            const creationDate = new Date().toISOString().split("T")[0];
            await pool.execute(
                "insert into user (id, username, email, password, create_time) values (uuid(), ?, ?, ?, ?)",
                [username, email, md5(user.password), creationDate]
            );
        } catch (err) {
            console.log(err);
            throw { error : ERROR_MESSAGES.createUser };
        }
    }


    async getUser(user: User): Promise<QueryResult> {
        try {
            const { email, password } = user;
            const pool = await this.connection.connect();
            const [result] = await pool.execute(
                "select email, password from user where email = ? and password = ? ",
                [email, md5(password)]
            );
            return result;
        } catch (err) {
            console.log(err);
            throw { error : ERROR_MESSAGES.invalidLogin };
        }
    }
}