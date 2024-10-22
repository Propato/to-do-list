import { RequestHandler } from "express";
import { ObjectSchema, ValidationError } from "yup";

import { Code, Status } from "../enums";
import { HttpResponse } from "../services";
import { IUser, IUserId } from "../../interfaces";

type TField = "body" | "params" | "query" | "header";
type TValidator = Record<TField, ObjectSchema<IUser | IUserId>>
type TValidation = (validators: Partial<TValidator>) => RequestHandler;

export const validation: TValidation = (validators) => async (req, res, next) => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}${req.originalUrl}`);
    
    const AllData: Record<string, any> = {};
    const AllErrors: Record<string, Record<string, string>> = {};
    let numErrors = 0;

    Object.entries(validators).forEach(([field, validator]) => {
        try {
            validator.validateSync(req[field as TField], { abortEarly: false});

        } catch (error: unknown) {
            const yupError = error as ValidationError;
            // console.error(yupError);

            const errors: Record<string, string> = {};
            yupError.inner.forEach(e => {
                if(e.path){
                    errors[e.path] = e.message;
                    numErrors++;
                }
            });

            AllErrors[field] = errors;
            AllData[field] = req[field as TField];
        }
    });

    if(numErrors){
        const errorMessage = ( numErrors === 1 ?
            `${numErrors} error occurred` : `${numErrors} errors occurred`
        );
        return res.status(Code.BAD_REQUEST).json(new HttpResponse(Code.BAD_REQUEST, Status.BAD_REQUEST, errorMessage, AllData, AllErrors));
    }
    return next();
} 