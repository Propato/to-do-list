import { Request, RequestHandler, Response } from "express";

import { QUERY } from "../../queries/user";
import { ResultSet } from "../../shared/types";
import { connection } from "../../shared/config";
import { Code, Status } from "../../shared/enums";
import { IUserId, VUserId } from "../../interfaces";
import { HttpResponse } from "../../shared/services";
import { validation } from "../../shared/middlewares";

export const validateDelete: RequestHandler = validation({
    params: VUserId
});

export const deleteUser = async (req: Request<IUserId>, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleString()}] Validated.`);

    const userId: IUserId = { ...req.params };
    
    try {
        const pool = await connection();
        let result: ResultSet = await pool.query(QUERY.SELECT, [Number(userId.userId)]);
        
        if((result[0] as Array<ResultSet>).length > 0){
            await pool.query(QUERY.DELETE, [Number(userId.userId)]);
            console.info(`[${new Date().toLocaleString()}] Deleted.`);
            
            return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'User deleted', userId));
        }
        console.info(`[${new Date().toLocaleString()}] Not Found.`);
        return res.status(Code.NOT_FOUND).send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'User not found', userId));
    } catch (error: unknown) {
        console.error(error);

        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
    }
};