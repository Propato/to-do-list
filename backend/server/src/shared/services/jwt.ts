import * as jwt from "jsonwebtoken"
import { IUserId } from "../../interfaces";

const login = (data: IUserId): string => {
    if(!process.env.JWT_KEY){
        if(process.env.APP_MODE === "dev")
            process.env.JWT_KEY = "null key, danger";
        else
            return "JWT_KEY_NOT_FOUND";
    }
    
    return jwt.sign(data, process.env.JWT_KEY, { expiresIn: "2h" });
}

const verify = (token: string): IUserId | "JWT_KEY_NOT_FOUND" | "INVALID_TOKEN" => {
    if(!process.env.JWT_KEY){
        if(process.env.APP_MODE === "dev")
            process.env.JWT_KEY = "null key, danger";
        else
            return "JWT_KEY_NOT_FOUND";
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        
        if(typeof decoded === "string")
            return "INVALID_TOKEN"

        return decoded as IUserId;

    } catch (error) {
        return "INVALID_TOKEN"
    }
}

export const JWT = {
    login, 
    verify
}