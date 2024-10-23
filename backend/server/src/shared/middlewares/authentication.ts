import { RequestHandler } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { ResultSet } from '../types';
import { connection } from '../config';
import { QUERY } from '../../queries/user';
import { HttpResponse, JWT } from "../services";

const TYPE = "Bearer";

export const authentication: RequestHandler = async (req, res, next) => {
    
    const { authorization } = req.headers;
    
    if(!authorization){
        console.info(`[${new Date().toLocaleString()}] Unauthorized`);
        return res.status(StatusCodes.UNAUTHORIZED).json(new HttpResponse(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED, "Unauthorized")); 
    }

    const [type, token] = authorization.split(" ");
    const data = JWT.verify(token);

    if(type !== TYPE || data === "INVALID_TOKEN"){
        console.info(`[${new Date().toLocaleString()}] Unauthorized`);
        return res.status(StatusCodes.UNAUTHORIZED).json(new HttpResponse(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED, "Unauthorized"));
    }
    
    if(data === "JWT_KEY_NOT_FOUND"){
        console.info(`[${new Date().toLocaleString()}] JWT_KEY not found in .env`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new HttpResponse(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR, 'An error occurred while generating access token'));
    }

    // If the user no longer exists, but the client still has the token.
    try {
        const pool = await connection();
        const result: ResultSet = await pool.query(QUERY.SELECT_NAME, [Number(data.userId)]);

        if((result[0] as Array<ResultSet>).length === 0){
            console.info(`[${new Date().toLocaleString()}] Not Found in authentication`);
            return res.status(StatusCodes.NOT_FOUND).json(new HttpResponse(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND, 'User not found during authentication'));
        }
    } catch (error: unknown) {
        console.error(error);

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new HttpResponse(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR, 'An error occurred during authentication'));
    }
    
    req.headers.userId = String(data.userId);
    console.info(`[${new Date().toLocaleString()}] Authenticated`);

    return next();
} 