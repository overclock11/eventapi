import express, {Request, Response, Router} from "express";
import multer from "multer";
import {EventManagementController} from "../controller/EventManagementController";
import {Event} from "../model/Event";
import {authentication} from "../middleware/Authentication";

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

        /**
         * @openapi
         * '/events':
         *  get:
         *     tags:
         *     - Event Controller
         *     summary: Get all events
         *     responses:
         *      200:
         *        description: Fetched Successfully
         *      500:
         *        description: Server Error
         */
        this.router.get("/events", async (req: Request, res: Response)=>{
            try{
                const value = await this.eventManagementController.getEvents();
                res.status(200).send(value);
            } catch (err) {
                res.status(500).json({message: err});
            }
        });


        /**
         * @openapi
         * '/event/{id}':
         *  get:
         *     tags:
         *     - Event Controller
         *     summary: Get one event by id
         *     parameters:
         *      - name: id
         *        in: path
         *        description: id of event
         *        required: true
         *     responses:
         *      200:
         *        description: Fetched Successfully
         *      500:
         *        description: Server Error
         */
        this.router.get("/event/:id", async (req: Request, res: Response)=>{
            try{
                const value = await this.eventManagementController.getEvent(req.params.id);
                res.status(200).send(value);
            } catch (err) {
                res.status(500).json({message: err});
            }
        })

        /**
         * @openapi
         * '/event':
         *  post:
         *     tags:
         *     - Event Controller
         *     summary: Create event
         *     requestBody:
         *      required: true
         *      content:
         *        application/json:
         *           schema:
         *            type: object
         *            required:
         *              - name
         *              - date
         *              - address
         *              - lat
         *              - lon
         *            properties:
         *              name:
         *                type: string
         *                default: Concierto de Iron Maiden
         *              date:
         *                type: string
         *                default: 2024-05-01
         *              address:
         *                type: string
         *                default: Calle 27 31 - 21
         *              lat:
         *                type: string
         *                default: -77.64103409928043
         *              lon:
         *                type: string
         *                default: 0.8277731438544862
         *     responses:
         *      200:
         *        description: Created
         *      500:
         *        description: Server Error
         */
        this.router.post("/event", async (req: Request, res: Response)=>{
            try {
                await this.eventManagementController.createEvent(req.body);
                res.status(200).send();
            } catch (err) {
                res.status(500).json({message: err});
            }
        })


        /**
         * @openapi
         * '/event/{id}':
         *  put:
         *     tags:
         *     - Event Controller
         *     summary: Update event
         *     requestBody:
         *      required: true
         *      content:
         *        application/json:
         *           schema:
         *            type: object
         *            required:
         *              - name
         *              - date
         *              - address
         *            properties:
         *              name:
         *                type: string
         *                default: Concierto de Iron Maiden
         *              date:
         *                type: string
         *                default: 2024-05-01
         *              address:
         *                type: string
         *                default: Calle 27 31 - 21
         *     responses:
         *      200:
         *        description: Created
         *      500:
         *        description: Server Error
         */
        this.router.put("/event/:id", async (req: Request, res: Response)=>{
            try {
                await this.eventManagementController.updateEvent(req.params.id, req.body);
                res.status(200).send(req.body);
            } catch (err) {
                res.status(500).json({message: err});
            }
        })

        /**
         * @openapi
         * '/event/register':
         *  post:
         *     tags:
         *     - Event Controller
         *     summary: Register user to an event - *requires authentication token*
         *     requestBody:
         *      required: true
         *      content:
         *        application/json:
         *           schema:
         *            type: array
         *            required:
         *              - eventId
         *              - userId
         *            properties:
         *              eventId:
         *                type: string
         *                default: 69a05a31-6d17-4e90-8ef4-98a95f8c5f0d
         *              userId:
         *                type: string
         *                default: fbf5a9d5-072b-11ef-acaa-00d861ab1006
         *     responses:
         *      200:
         *        description: Created
         *      500:
         *        description: Server Error
         */
        this.router.post("/event/register", authentication, async (req: Request, res: Response) => {
            try {
                await this.eventManagementController.registerUsersForAnEvent(req.body);
                res.status(200).send(req.body);
            } catch (err) {
                res.status(500).json({message: err});
            }
        })


        /**
         * @openapi
         * '/event/import':
         *  post:
         *     tags:
         *     - Event Controller
         *     summary: Load a xlsx with a list of events *requires authentication token*
         *     requestBody:
         *      required: true
         *      content:
         *        multipart/form-data:
         *           schema:
         *            type: object
         *            required:
         *              - file
         *              - userId
         *            properties:
         *              file:
         *                type: file
         *                default:
         *     responses:
         *      200:
         *        description: Created
         *      500:
         *        description: Server Error
         */
        this.router.post("/event/import", authentication, this.upload.single("file"), async (req: Request, res: Response) => {
            try {
                if (req.file) {
                    const value = await this.eventManagementController.importEvents(req.file);
                    res.status(200).send(value);
                }
            } catch (err) {
                res.status(500).json({message: err});
            }
        })


        /**
         * @openapi
         * '/event/{id}/nearby-location':
         *  get:
         *     tags:
         *     - Event Controller
         *     summary: Get one event by id with nearby locations
         *     parameters:
         *      - name: id
         *        in: path
         *        description: id of event
         *        required: true
         *     responses:
         *      200:
         *        description: Fetched Successfully
         *      500:
         *        description: Server Error
         */
        this.router.get("/event/:id/nearby-locations", async (req: Request, res: Response)=>{
            try{
                const event = await this.eventManagementController.getEvent(req.params.id);
                const eventWithNearby = await this.eventManagementController.nearbyLocations(event as unknown as Event[]);
                res.status(200).send(eventWithNearby);
            } catch (err) {
                res.status(500).json({message: err});
            }
        })
    }


}