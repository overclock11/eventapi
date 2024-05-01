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
        /**
         * @openapi
         * '/user/create':
         *  post:
         *     tags:
         *     - Users Controller
         *     summary: Create a new user
         *     requestBody:
         *      required: true
         *      content:
         *        application/json:
         *           schema:
         *            type: object
         *            required:
         *              - username
         *              - email
         *              - password
         *            properties:
         *              username:
         *                type: string
         *                default: Goku
         *              email:
         *                type: string
         *                default: gokusupersaiyan@yopmail.com
         *              password:
         *                type: string
         *                default: gohanygoten2
         *     responses:
         *      200:
         *        description: Created
         *      500:
         *        description: Server Error
         */
        this.router.post("/user/create", async (req: Request, res: Response)=>{
            try {
                await this.userController.createUser(req.body);
                res.status(200).send();
            } catch (err) {
                res.status(500).json({message: err});
            }
        })

        /**
         * @openapi
         * '/user/login':
         *  post:
         *     tags:
         *     - Users Controller
         *     summary: Login with a user and return de JWT token
         *     requestBody:
         *      required: true
         *      content:
         *        application/json:
         *           schema:
         *            type: object
         *            required:
         *              - email
         *              - password
         *            properties:
         *              username:
         *                type: string
         *                default: Goku
         *              password:
         *                type: string
         *                default: gohanygoten2
         *     responses:
         *      200:
         *        description: Created
         *      500:
         *        description: Server Error
         */
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