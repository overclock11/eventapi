import {User} from "../model/User";
import moment from "moment";
import jwt from "jwt-simple";
import dotenv from "dotenv";

dotenv.config();

export const createToken = (user: User) => {
    const payload = {
        userEmail: user.username,
        createdAt: moment().unix(),
        expiresAt: moment().add(1, "hour").unix()
    }
    return jwt.encode(payload, process.env.TOKEN_KEY as string);
}