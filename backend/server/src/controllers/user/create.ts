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
    console.info(`[${new Date().toLocaleString()}] Validated`);

    let user: IUser = { ...req.body };
    user.passhash = await Crypto.hashPassword(user.passhash);

    try {
        const pool = await connection();
        await pool.query(QUERY.CREATE, Object.values(user));
    
        console.info(`[${new Date().toLocaleString()}] Created`);
        return res.status(StatusCodes.CREATED).json(new HttpResponse(StatusCodes.CREATED, ReasonPhrases.CREATED, 'User created'));
        
    } catch (error: any) {
        console.error(error);

        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(StatusCodes.CONFLICT).json(new HttpResponse(StatusCodes.CONFLICT, ReasonPhrases.CONFLICT, '1 error occurred', undefined, { "body": { "email": "Email is already in use" }}));}

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new HttpResponse(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR, 'An error occurred'));
    }
};