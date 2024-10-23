import { Request, RequestHandler, Response } from "express";
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { QUERY } from "../../queries/user";
import { ResultSet } from "../../shared/types";
import { connection } from "../../shared/config";
import { VUserId } from "../../interfaces";
import { HttpResponse } from "../../shared/services";
import { validation } from "../../shared/middlewares";

export const validateDelete: RequestHandler = validation({
    header: VUserId
});

export const deleteUser = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {

    const userId = Number(String(req.headers.userId));
    
    try {
        const pool = await connection();
        let result: ResultSet = await pool.query(QUERY.SELECT_NAME, [userId]);
        
        if((result[0] as Array<ResultSet>).length > 0){
            await pool.query(QUERY.DELETE, [userId]);

            console.info(`[${new Date().toLocaleString()}] Deleted`);
            return res.status(StatusCodes.OK).json(new HttpResponse(StatusCodes.OK, ReasonPhrases.OK, 'User deleted'));
        }
        
        console.info(`[${new Date().toLocaleString()}] Not Found`);
        return res.status(StatusCodes.NOT_FOUND).json(new HttpResponse(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND, 'User not found'));

    } catch (error: unknown) {
        console.error(error);

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new HttpResponse(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR, 'An error occurred'));
    }
};