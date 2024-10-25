import { Request, RequestHandler, Response } from "express";
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { QUERY } from "../../queries/task";
import { ResultSet } from "../../shared/types";
import { pool } from "../../shared/config";
import { HttpResponse } from "../../shared/services";
import { validation } from "../../shared/middlewares";
import { VUserId, VFilter, IFilter } from "../../interfaces";

export const validateGetAllFiltered: RequestHandler = validation({
    body: VFilter,
    header: VUserId
});

export const getAllFiltered = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    // Despite the redundancy in the filter with '%', this serves to simplify the code.
    let filter: IFilter = { 
        title:       req.body.text? "%"+req.body.text+"%" : "%",
        description: req.body.text? "%"+req.body.text+"%" : "%",
        status: req.body.status || "%",
        LIMIT: Number(req.body.LIMIT) || 10,
        OFFSET: Number(req.body.OFFSET) || 0
    };
    const userId = Number(String(req.headers.userId));
    
    try {
        const result: ResultSet = await pool.query(QUERY.SELECT_ALL, [userId, ...Object.values(filter)]);

        console.info(`[${new Date().toLocaleString()}] Retrieved`);
        return res.status(StatusCodes.OK).json(new HttpResponse(StatusCodes.OK, ReasonPhrases.OK, 'Tasks retrieved', result[0]));
    } catch (error: unknown) {
        console.error(error);

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new HttpResponse(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR, 'An error occurred'));
    }
};