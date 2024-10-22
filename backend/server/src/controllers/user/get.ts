import { Request, RequestHandler, Response } from "express";

import { Code, Status } from "../../shared/enums";
import { IUserId, VUserId } from "../../interfaces";
import { HttpResponse } from "../../shared/services";
import { validation } from "../../shared/middlewares";

export const validateGet: RequestHandler = validation({
    params: VUserId
});

export const get = async (req: Request<IUserId>, res: Response): Promise<Response<HttpResponse>> => {
    const userId: IUserId = { ...req.params };
    
    try {
        return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'User retrieved', userId));
    } catch (error: unknown) {
        console.error(error);

        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
    }
};