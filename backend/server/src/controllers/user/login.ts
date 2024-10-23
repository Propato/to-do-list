import { Request, RequestHandler, Response } from "express";
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { IUser } from "../../interfaces";
import { QUERY } from "../../queries/user";
import { ResultSet } from "../../shared/types";
import { connection } from "../../shared/config";
import { validation } from "../../shared/middlewares";
import { ILogin, VLogin } from "../../interfaces/login";
import { Crypto, HttpResponse, JWT } from "../../shared/services";

export const validateLogin: RequestHandler = validation({
    body: VLogin
});

export const login = async (req: Request<{}, {}, ILogin>, res: Response): Promise<Response<HttpResponse>> => {

    let login: ILogin = { ...req.body };

    try {
        const pool = await connection();
        const result = (await pool.query(QUERY.SELECT_BY_EMAIL, [login.email]))[0] as Array<ResultSet>;

        if(result.length > 0){
            let user = result[0] as unknown as IUser;

            if(await Crypto.comparePassword(login.password, user.password)){

                const accessToken = JWT.login({ userId: Number(user.id) });

                if(accessToken === "JWT_KEY_NOT_FOUND"){
                    console.error(accessToken);
                    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new HttpResponse(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR, 'An error occurred while generating access token'));
                }

                console.info(`[${new Date().toLocaleString()}] Logged in`);
                return res.status(StatusCodes.OK).json(new HttpResponse(StatusCodes.OK, ReasonPhrases.OK, 'User logged in', accessToken));
            }

            console.info(`[${new Date().toLocaleString()}] Invalid password`);
            return res.status(StatusCodes.BAD_REQUEST).json(new HttpResponse(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST, 'Invalid password'));
        }
        
        console.info(`[${new Date().toLocaleString()}] Invalid email`);
        return res.status(StatusCodes.NOT_FOUND).json(new HttpResponse(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND, 'Invalid email'));

    } catch (error: unknown) {
        console.error(error);

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new HttpResponse(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR, 'An error occurred'));
    }
};