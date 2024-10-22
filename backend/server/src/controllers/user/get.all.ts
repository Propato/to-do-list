import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { QUERY } from "../../queries/user";
import { ResultSet } from "../../shared/types";
import { connection } from "../../shared/config";
import { HttpResponse } from "../../shared/services";

export const getAll = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}${req.originalUrl}`);
    
    try {
        const pool = await connection();
        const result: ResultSet = await pool.query(QUERY.SELECT_ALL);

        console.info(`[${new Date().toLocaleString()}] Retrieved.`);
        return res.status(StatusCodes.OK).send(new HttpResponse(StatusCodes.OK, ReasonPhrases.OK, 'Users retrieved', result[0]));
    } catch (error: unknown) {
        console.error(error);

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(new HttpResponse(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR, 'An error occurred'));
    }
};