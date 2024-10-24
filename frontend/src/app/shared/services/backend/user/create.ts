import { AxiosResponse } from "axios";
import { IUser } from "../../../interfaces";
import { db } from "../config";

export const create = async (userData: Omit<IUser, 'id'>): Promise<any> => {
    try {
        const result = await db().post('/users', userData).then((resp: AxiosResponse<any, any>) => {
            return resp;
        });
        console.log(result);
        
        const result2 = await db().post('/users', userData);
        console.log(result2);

        return result;

    } catch (error: unknown) {
        console.log(error)

        return error;
    }
};