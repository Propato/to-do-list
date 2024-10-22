import { Request, Response } from "express";

import { QUERY } from "../../queries/user";
import { ResultSet } from "../../shared/types";
import { connection } from "../../shared/config";
import { Code, Status } from "../../shared/enums";
import { HttpResponse } from "../../shared/services";

export const getAll = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}${req.originalUrl}`);
    
    try {
        const pool = await connection();
        const result: ResultSet = await pool.query(QUERY.SELECT_ALL);

        console.info(`[${new Date().toLocaleString()}] Retrieved.`);
        return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'Users retrieved', result[0]));
    } catch (error: unknown) {
        console.error(error);

        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
    }
};