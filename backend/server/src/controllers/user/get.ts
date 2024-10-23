import { Request, RequestHandler, Response } from "express";
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { QUERY } from "../../queries/user";
import { ResultSet } from "../../shared/types";
import { connection } from "../../shared/config";
import { VUserId } from "../../interfaces";
import { HttpResponse } from "../../shared/services";
import { validation } from "../../shared/middlewares";

export const validateGet: RequestHandler = validation({
    header: VUserId
});

export const get = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    
    const userId = Number(String(req.headers.userId));
    
    try {
        const pool = await connection();
        const result: ResultSet = await pool.query(QUERY.SELECT_NAME, [userId]);

        if((result[0] as Array<ResultSet>).length > 0){
            
            console.info(`[${new Date().toLocaleString()}] Retrieved`);
            return res.status(StatusCodes.OK).json(new HttpResponse(StatusCodes.OK, ReasonPhrases.OK, 'User retrieved', result[0]));
        }

        console.info(`[${new Date().toLocaleString()}] Not Found`);
        return res.status(StatusCodes.NOT_FOUND).json(new HttpResponse(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND, 'User not found'));

    } catch (error: unknown) {
        console.error(error);

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new HttpResponse(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR, 'An error occurred'));
    }
};