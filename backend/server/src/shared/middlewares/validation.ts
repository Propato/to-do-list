import { RequestHandler } from "express";
import { ObjectSchema, ValidationError } from "yup";

import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { HttpResponse } from "../services";
import { IUser, IUserId, ILogin } from "../../interfaces";

type TField = "body" | "params" | "query" | "header";
type TValidator = Record<TField, ObjectSchema<IUser | IUserId | ILogin>>
type TValidation = (validators: Partial<TValidator>) => RequestHandler;

export const validation: TValidation = (validators) => async (req, res, next) => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}${req.originalUrl}`);
    
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
        }
    });

    if(numErrors){
        const errorMessage = ( numErrors === 1 ?
            `${numErrors} error occurred` : `${numErrors} errors occurred`
        );

        console.info(`[${new Date().toLocaleString()}] Errors: ${AllErrors}`);
        return res.status(StatusCodes.BAD_REQUEST).json(new HttpResponse(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST, errorMessage, undefined, AllErrors));
    }
    console.info(`[${new Date().toLocaleString()}] Validated`);
    return next();
} 