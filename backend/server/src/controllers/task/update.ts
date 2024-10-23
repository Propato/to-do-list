import { Request, RequestHandler, Response } from "express";
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { QUERY } from "../../queries/task";
import { ResultSet } from "../../shared/types";
import { connection } from "../../shared/config";
import { validation } from "../../shared/middlewares";
import { ITask, VTask, VUserId } from "../../interfaces";
import { HttpResponse } from "../../shared/services";

export const validateUpdate: RequestHandler = validation({
    body: VTask,
    header: VUserId
});

export const update = async (req: Request<{}, {}, ITask>, res: Response): Promise<Response<HttpResponse>> => {

    let task: ITask = { 
        title: String(req.body.title),
        description: req.body.description || "",
        deadline: new Date(req.body.deadline || "")
    };
    const userId = Number(String(req.headers.userId));
    const taskId = Number(req.body.taskId);

    try {
        const pool = await connection();
        const result: ResultSet = await pool.query(QUERY.SELECT, [taskId, userId]);
        
        if((result[0] as Array<ResultSet>).length > 0){
            await pool.query(QUERY.UPDATE, [...Object.values(task), taskId, userId]);

            console.info(`[${new Date().toLocaleString()}] Updated`);
            return res.status(StatusCodes.OK).json(new HttpResponse(StatusCodes.OK, ReasonPhrases.OK, 'Task updated'));
        }
        
        console.info(`[${new Date().toLocaleString()}] Not Found`);
        return res.status(StatusCodes.NOT_FOUND).json(new HttpResponse(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND, 'Task not found'));

    } catch (error: any) {
        console.error(error);

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new HttpResponse(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR, 'An error occurred'));
    }
};
