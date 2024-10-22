import { ResultSetHeader } from "mysql2";
import { Request, RequestHandler, Response } from "express";
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { QUERY } from "../../queries/user";
import { IUser, VUser } from "../../interfaces";
import { connection } from "../../shared/config";
import { validation } from "../../shared/middlewares";
import { Crypto, HttpResponse } from "../../shared/services";

export const validateCreate: RequestHandler = validation({
    body: VUser
});

export const create = async (req: Request<{}, {}, IUser>, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleString()}] Validated.`);

    let user: IUser = { ...req.body };
    user.passhash = await Crypto.hashPassword(user.passhash);

    try {
        const pool = await connection();
        const result = (await pool.query(QUERY.CREATE, Object.values(user))) as Array<ResultSetHeader>;
    
        console.info(`[${new Date().toLocaleString()}] Created.`);
        
        return res.status(StatusCodes.CREATED).send(new HttpResponse(StatusCodes.CREATED, ReasonPhrases.CREATED, 'User created'));
        
    } catch (error: unknown) {
        console.error(error);

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(new HttpResponse(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR, 'An error occurred'));
    }
};