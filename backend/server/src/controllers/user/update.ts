import { Request, RequestHandler, Response } from "express";

import { Code, Status } from "../../shared/enums";
import { HttpResponse } from "../../shared/services";
import { validation } from "../../shared/middlewares";
import { IUser, IUserId, VUser, VUserId } from "../../interfaces";

export const validateUpdate: RequestHandler = validation({
    body: VUser,
    params: VUserId
});

export const update = async (req: Request<IUserId, {}, IUser>, res: Response): Promise<Response<HttpResponse>> => {
    let user: IUser = { ...req.body };
    const userId: IUserId = { ...req.params };
    user.id = Number(userId.userId);

    try {
        return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'User updated', user));

    } catch (error: unknown) {
        console.error(error);

        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
    }
};
