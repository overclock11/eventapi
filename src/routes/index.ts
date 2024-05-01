import express, {Request, Response, Router} from "express";
import multer from "multer";
import {EventManagementController} from "../controller/EventManagementController";
import {ERROR_MESSAGES} from "../constant/ErrorMessages";

export class EventManagement {
    public router: Router;
    private eventManagementController: EventManagementController;

    private upload = multer({dest: "../files/"})

    constructor() {
        this.router = express.Router();
        this.eventManagementController = new EventManagementController();
        this.setUp();
    }

    setUp(){
        this.router.get("/events", async (req: Request, res: Response)=>{
            try{
                const value = await this.eventManagementController.getEvents();
                res.status(200).send(value);
            } catch (err) {
                res.status(500).json({message: err});
            }
        });

        this.router.get("/event/:id", async (req: Request, res: Response)=>{
            try{
                const value = await this.eventManagementController.getEvent(req.params.id);
                res.status(200).send(value);
            } catch (err) {
                res.status(500).json({message: err});
            }
        })

        this.router.post("/event", async (req: Request, res: Response)=>{
            try {
                await this.eventManagementController.createEvent(req.body);
                res.status(200).send();
            } catch (err) {
                res.status(500).json({message: err});
            }
        })

        this.router.put("/event/:id", async (req: Request, res: Response)=>{
            try {
                await this.eventManagementController.updateEvent(req.params.id, req.body);
                res.status(200).send(req.body);
            } catch (err) {
                res.status(500).json({message: err});
            }
        })

        this.router.post("/event/register", async (req: Request, res: Response) => {
            try {
                await this.eventManagementController.registerUsersForAnEvent(req.body);
                res.status(200).send(req.body);
            } catch (err) {
                res.status(500).json({message: err});
            }
        })

        this.router.post("/event/import", this.upload.single("file"), async (req: Request, res: Response) => {
            try {
                if (req.file) {
                    const value = await this.eventManagementController.importEvents(req.file);
                    res.status(200).send(value);
                }
            } catch (err) {
                res.status(500).json({message: err});
            }
        })
    }


}