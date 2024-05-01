import {Request, Response, NextFunction} from "express";
import {ERROR_MESSAGES} from "../constant/ErrorMessages";
import jwt from "jwt-simple";
import moment from "moment";

export const authentication = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers["token"]) {
        return res.status(400).json({message: ERROR_MESSAGES.invalidToken});
    }
    const token = req.headers["token"];
    try {
        const payload = jwt.decode(token as string, process.env.TOKEN_KEY as string);
        if(moment().unix() > payload.expiresAt) {
            return res.status(400).json({message: ERROR_MESSAGES.expiredToken});
        }
    } catch (err) {
        console.log(err);
        return res.status(400).json({message: ERROR_MESSAGES.invalidToken});
    }
    next();
}