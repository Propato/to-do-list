import { Request, RequestHandler, Response } from "express";

import { QUERY } from "../../queries/user";
import { connection } from "../../shared/config";
import { Code, Status } from "../../shared/enums";
import { validation } from "../../shared/middlewares";
import { Crypto, HttpResponse, JWT } from "../../shared/services";
import { ILogin, VLogin } from "../../interfaces/login";
import { ResultSet } from "../../shared/types";
import { IUser } from "../../interfaces";

export const validateLogin: RequestHandler = validation({
    body: VLogin
});

export const login = async (req: Request<{}, {}, ILogin>, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleString()}] Validated.`);

    let login: ILogin = { ...req.body };

    try {
        const pool = await connection();
        const result = (await pool.query(QUERY.SELECT_BY_EMAIL, [login.email]))[0] as Array<ResultSet>;

        if(result.length > 0){
            let user = result[0] as unknown as IUser;

            if(await Crypto.comparePassword(login.passhash, user.passhash)){

                const accessToken = JWT.login({ userId: Number(user.id) });

                if(accessToken === "JWT_KEY_NOT_FOUND"){
                    console.error(accessToken);
                    return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred while generating access token'));
                }

                console.info(`[${new Date().toLocaleString()}] Logged in.`);
                user.passhash = ":P";

                return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'User logged in', accessToken));
            }

            return res.status(Code.BAD_REQUEST).send(new HttpResponse(Code.BAD_REQUEST, Status.BAD_REQUEST, 'Invalid password'));
        }
        console.info(`[${new Date().toLocaleString()}] Not Found.`);
        return res.status(Code.NOT_FOUND).send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'Invalid e-mail'));

    } catch (error: unknown) {
        console.error(error);

        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
    }
};