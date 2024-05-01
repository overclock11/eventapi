import {User} from "../model/User";
import {UserPersistence} from "../persistence/UserPersistence";
import {QueryResult} from "mysql2";

export class UserController {
    private userPersistence: UserPersistence;
    constructor() {
        this.userPersistence = new UserPersistence();
    }
    async createUser(user: User): Promise<void> {
        return this.userPersistence.createUser(user);
    }

    async getUser(user: User): Promise<QueryResult> {
        return this.userPersistence.getUser(user);
    }
}