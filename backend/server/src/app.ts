import ip from "ip";
import cors from "cors";
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import express, { Application, Request, Response } from "express";

import { RoutersController } from "./routers";
import { HttpResponse } from "./shared/services";
import { authentication } from "./shared/middlewares";

export class App {
    private readonly app: Application;

    constructor(private readonly port: (string | number) = process.env.SERVER_PORT || 8000){
        this.app = express();
        this.middleWare();
        this.routes();
    }
    
    listen(): void {
        this.app.listen(this.port, () => {
            console.info(`Application is running on: ${ip.address()}:${this.port}`);
        });
    }

    private middleWare(): void {
        this.app.use(cors({ origin:'*'}));
        this.app.use(express.json());
    }

    private routes(): void {
        this.app.use('/users', RoutersController.User);
        this.app.use('/tasks', authentication, RoutersController.Task);

        this.app.get('/', (req: Request, res: Response) => {
            console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);

            res.status(StatusCodes.OK).json(new HttpResponse(StatusCodes.OK, ReasonPhrases.OK, 'Welcome to the Backend API of the To-Do list'))
        });
        this.app.all('*', (req: Request, res: Response) => {
            console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);

            res.status(StatusCodes.NOT_IMPLEMENTED).json(new HttpResponse(StatusCodes.NOT_IMPLEMENTED, ReasonPhrases.NOT_IMPLEMENTED, "Route does not exist on the server."))
        });
    }
}