import { Request, RequestHandler, Response } from "express";
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { QUERY } from "../../queries/user";
import { ResultSet } from "../../shared/types";
import { pool } from "../../shared/config";
import { validation } from "../../shared/middlewares";
import { IUser, VUser, VUserId } from "../../interfaces";
import { Crypto, HttpResponse } from "../../shared/services";

export const validateUpdate: RequestHandler = validation({
    body: VUser,
    header: VUserId
});

export const update = async (req: Request<{}, {}, IUser>, res: Response): Promise<Response<HttpResponse>> => {

    let user: IUser = { ...req.body };
    const userId = Number(String(req.headers.userId));
    user.password = await Crypto.hashPassword(user.password);

    try {
        const result: ResultSet = await pool.query(QUERY.SELECT, [userId]);
        
        if((result[0] as Array<ResultSet>).length > 0){
            await pool.query(QUERY.UPDATE, [user.name, user.email, user.password, userId]);

            console.info(`[${new Date().toLocaleString()}] Updated`);
            return res.status(StatusCodes.OK).json(new HttpResponse(StatusCodes.OK, ReasonPhrases.OK, 'User updated'));
        }
        
        console.info(`[${new Date().toLocaleString()}] Not Found`);
        return res.status(StatusCodes.NOT_FOUND).json(new HttpResponse(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND, 'User not found'));

    } catch (error: any) {
        console.error(error);

        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(StatusCodes.CONFLICT).json(new HttpResponse(StatusCodes.CONFLICT, ReasonPhrases.CONFLICT, '1 error occurred', undefined, { "body": { "email": "Email is already in use" }}));}

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new HttpResponse(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR, 'An error occurred'));
    }
};
