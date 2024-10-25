import { Request, RequestHandler, Response } from "express";
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { QUERY } from "../../queries/task";
import { ResultSet } from "../../shared/types";
import { pool } from "../../shared/config";
import { validation } from "../../shared/middlewares";
import { HttpResponse } from "../../shared/services";
import { IStatus, VStatus, VUserId } from "../../interfaces";
import { ResultSetHeader } from "mysql2";

export const validateUpdateStatus: RequestHandler = validation({
    body: VStatus,
    header: VUserId
});

export const updateStatus = async (req: Request<{}, {}, IStatus>, res: Response): Promise<Response<HttpResponse>> => {

    let status: IStatus = { ...req.body };
    const userId = Number(String(req.headers.userId));

    try {
        let result: ResultSet = await pool.query(QUERY.SELECT, [Number(status.taskId), userId]);
        
        if((result[0] as Array<ResultSet>).length > 0){
            result = await pool.query(QUERY.UPDATE_STATUS, [status.status, Number(status.taskId), userId]);

            if((result[0] as ResultSetHeader).affectedRows === 0){
                console.info(`[${new Date().toLocaleString()}] Task overdue`);
                return res.status(StatusCodes.CONFLICT).json(new HttpResponse(StatusCodes.CONFLICT, ReasonPhrases.CONFLICT, 'Task is overdue'));
            }

            console.info(`[${new Date().toLocaleString()}] Updated`);
            return res.status(StatusCodes.OK).json(new HttpResponse(StatusCodes.OK, ReasonPhrases.OK, 'Task status updated'));
        }
        
        console.info(`[${new Date().toLocaleString()}] Not Found`);
        return res.status(StatusCodes.NOT_FOUND).json(new HttpResponse(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND, 'Task not found'));

    } catch (error: any) {
        console.error(error);

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new HttpResponse(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR, 'An error occurred'));
    }
};
