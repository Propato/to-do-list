import { Request, RequestHandler, Response } from "express";

import { QUERY } from "../../queries/user";
import { ResultSet } from "../../shared/types";
import { connection } from "../../shared/config";
import { Code, Status } from "../../shared/enums";
import { VUserId } from "../../interfaces";
import { HttpResponse } from "../../shared/services";
import { validation } from "../../shared/middlewares";

export const validateGet: RequestHandler = validation({
    header: VUserId
});

export const get = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleString()}] Validated.`);
    
    const userId = Number(String(req.headers.userId));
    
    try {
        const pool = await connection();
        const result: ResultSet = await pool.query(QUERY.SELECT_NAME, [userId]);

        if((result[0] as Array<ResultSet>).length > 0){
            console.info(`[${new Date().toLocaleString()}] Retrieved.`);
            return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'User retrieved', result[0]));
        }
        console.info(`[${new Date().toLocaleString()}] Not Found.`);
        return res.status(Code.NOT_FOUND).send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'User not found'));

    } catch (error: unknown) {
        console.error(error);

        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
    }
};