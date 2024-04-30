import express, {Request, Response, Router} from "express";
import {UserController} from "../controller/UserController";
import {createToken} from "../utils/CreateToken";
import {User} from "../model/User";
import {authentication} from "../middleware/Authentication";

export class UserRoute {
    public router: Router;
    private userController: UserController;

    constructor() {
        this.router = express.Router();
        this.userController = new UserController();
        this.setUp();
    }

    setUp() {
        this.router.post("/user/create", authentication, async (req: Request, res: Response)=>{
            try {
                await this.userController.createUser(req.body);
                res.status(200).send();
            } catch (err) {
                res.status(500).json({message: err});
            }
        })

        this.router.post("/user/login", async (req: Request, res: Response)=>{
            try {
                const user: User = await this.userController.getUser(req.body) as unknown as User;
                res.status(200).send({
                    token: createToken(user),
                });
            } catch (err) {
                res.status(500).json({message: err});
            }
        })
    }
}