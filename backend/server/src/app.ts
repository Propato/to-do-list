import ip from "ip";
import cors from "cors";
import express, { Application, Request, Response } from "express";

import { RoutersController } from "./routers";
import { Code, Status } from "./shared/enums";
import { HttpResponse } from "./shared/services";

export class App {
    private readonly app: Application;

    constructor(private readonly port: (string | number) = Number(process.env.SERVER_PORT)){
        if(!Number(process.env.SERVER_PORT)){
            console.log("Error: SERVER_PORT not found in .env");
            process.exit(1);
        }

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

        this.app.get('/', (req: Request, res: Response) => {
            console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);

            res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'Welcome to the Backend API of the To-Do list'))
        });
        this.app.all('*', (req: Request, res: Response) => {
            console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);

            res.status(Code.NOT_FOUND).send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, "Route does not exist on the server."))
        });
    }
}