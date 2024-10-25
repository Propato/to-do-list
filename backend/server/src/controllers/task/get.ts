import { Request, RequestHandler, Response } from "express";
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { QUERY } from "../../queries/task";
import { ResultSet } from "../../shared/types";
import { pool } from "../../shared/config";
import { HttpResponse } from "../../shared/services";
import { validation } from "../../shared/middlewares";
import { VUserId, VTaskId } from "../../interfaces";

export const validateGet: RequestHandler = validation({
    params: VTaskId,
    header: VUserId
});

export const get = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    const userId = Number(String(req.headers.userId));
    const taskId = Number(req.params.taskId);
    
    try {
        const result: ResultSet = await pool.query(QUERY.SELECT, [taskId, userId]);

        if((result[0] as Array<ResultSet>).length > 0){
            console.info(`[${new Date().toLocaleString()}] Retrieved`);
            return res.status(StatusCodes.OK).json(new HttpResponse(StatusCodes.OK, ReasonPhrases.OK, 'Task retrieved', (result[0] as ResultSet[])[0]));
        }

        console.info(`[${new Date().toLocaleString()}] Not Found`);
        return res.status(StatusCodes.NOT_FOUND).json(new HttpResponse(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND, 'Task not found'));
    } catch (error: unknown) {
        console.error(error);

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new HttpResponse(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR, 'An error occurred'));
    }
};