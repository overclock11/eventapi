import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import {EventManagement} from "./routes/EventRoute";
import {UserRoute} from "./routes/UserRoute";
import swaggerUi from "swagger-ui-express";
import {swaggerSpec} from "../swagger";


dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json())



app.use(new EventManagement().router);
app.use(new UserRoute().router);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});