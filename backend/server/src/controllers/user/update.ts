import { Request, RequestHandler, Response } from "express";

import { QUERY } from "../../queries/user";
import { ResultSet } from "../../shared/types";
import { connection } from "../../shared/config";
import { Code, Status } from "../../shared/enums";
import { hashPassword, HttpResponse } from "../../shared/services";
import { validation } from "../../shared/middlewares";
import { IUser, IUserId, VUser, VUserId } from "../../interfaces";

export const validateUpdate: RequestHandler = validation({
    body: VUser,
    params: VUserId
});

export const update = async (req: Request<IUserId, {}, IUser>, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleString()}] Validated.`);

    let user: IUser = { ...req.body };
    const userId: IUserId = { ...req.params };
    user.passhash = await hashPassword(user.passhash);

    try {
        const pool = await connection();
        const result: ResultSet = await pool.query(QUERY.SELECT, [Number(userId.userId)]);
        
        if((result[0] as Array<ResultSet>).length > 0){
            const result: ResultSet = await pool.query(QUERY.UPDATE, [...Object.values(user), Number(userId.userId)]);

            user.id = Number(userId.userId);
            user.passhash = ":P"; // Don't send back the passhash
            
            console.info(`[${new Date().toLocaleString()}] Updated.`);

            return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'User updated', user));
        }
        user.id = Number(userId.userId);
        console.info(`[${new Date().toLocaleString()}] Not Found.`);

        return res.status(Code.NOT_FOUND).send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'User not found', user));

    } catch (error: unknown) {
        console.error(error);

        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
    }
};
