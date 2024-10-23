import { Request, Response, RequestHandler } from "express";
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { ITask, VTask, VUserId } from "../../interfaces";
import { QUERY } from "../../queries/task";
import { HttpResponse } from "../../shared/services";
import { validation } from "../../shared/middlewares";
import { connection } from "../../shared/config";

export const validateCreate: RequestHandler = validation({
    body: VTask,
    header: VUserId
});

export const create = async (req: Request<{}, {}, ITask>, res: Response): Promise<Response<HttpResponse>> => {
    
    let task: ITask = { 
        title: String(req.body.title),
        description: req.body.description || "",
        deadline: new Date(req.body.deadline || ""),
        status: req.body.status || "pending",
    };

    const userId = Number(String(req.headers.userId));
    
    try {
        const pool = await connection();
        await pool.query(QUERY.CREATE, [userId, ...Object.values(task)]);
        // await pool.query(QUERY.CREATE, [userId, task.title, task.description, task.deadline, task.status]);

        console.info(`[${new Date().toLocaleString()}] Created`);
        return res.status(StatusCodes.CREATED).json(new HttpResponse(StatusCodes.CREATED, ReasonPhrases.CREATED, 'Task created'));
    } catch (error) {
        console.error(error);

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new HttpResponse(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR, "An error occurred"));
    }
};