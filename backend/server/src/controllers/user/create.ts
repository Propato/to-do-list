import { Request, RequestHandler, Response } from "express";

import { IUser, VUser } from "../../interfaces";
import { Code, Status } from "../../shared/enums";
import { validation } from "../../shared/middlewares";
import { hashPassword, HttpResponse } from "../../shared/services";

export const validateCreate: RequestHandler = validation({
    body: VUser
});

export const create = async (req: Request<{}, {}, IUser>, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`Validated.`);

    let user: IUser = { ...req.body };
    user.passhash = await hashPassword(user.passhash);

    try {
        user.passhash = ":P"; // Don't send back the passhash
        return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'User created', user ));
    } catch (error: unknown) {
        console.error(error);

        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
    }
};