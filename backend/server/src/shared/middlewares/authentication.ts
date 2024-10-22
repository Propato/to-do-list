import { RequestHandler } from "express";
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { HttpResponse, JWT } from "../services";

const TYPE = "Bearer";

export const authentication: RequestHandler = (req, res, next) => {
    
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
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(new HttpResponse(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR, 'An error occurred while generating access token'));
    }
    
    req.headers.userId = String(data.userId);
    console.info(`[${new Date().toLocaleString()}] Authenticated`);

    return next();
} 