import { ResultSetHeader } from "mysql2";
import { Request, RequestHandler, Response } from "express";

import { QUERY } from "../../queries/user";
import { IUser, VUser } from "../../interfaces";
import { connection } from "../../shared/config";
import { Code, Status } from "../../shared/enums";
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
        
        return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'User created'));
        
    } catch (error: unknown) {
        console.error(error);

        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
    }
};