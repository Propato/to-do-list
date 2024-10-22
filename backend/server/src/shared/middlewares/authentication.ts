import { RequestHandler } from "express";
import { Code, Status } from "../enums";
import { HttpResponse, JWT } from "../services";

const TYPE = "Bearer";

export const authentication: RequestHandler = (req, res, next) => {
    console.info(`[${new Date().toLocaleString()}] Authenticating...`);

    const { authorization } = req.headers;

    if(!authorization)
        return res.status(Code.BAD_REQUEST).json(new HttpResponse(Code.BAD_REQUEST, Status.BAD_REQUEST, "Unauthorized")); 
    
    const [type, token] = authorization.split(" ");
    const data = JWT.verify(token);

    if(type !== TYPE || data === "INVALID_TOKEN")
        return res.status(Code.BAD_REQUEST).json(new HttpResponse(Code.BAD_REQUEST, Status.BAD_REQUEST, "Unauthorized"));
    
    if(data === "JWT_KEY_NOT_FOUND") 
        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred while generating access token'));
    
    req.headers.userId = String(data.userId);

    return next();
} 