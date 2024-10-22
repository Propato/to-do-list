import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export class HttpResponse{
    private timeStamp: string;
    constructor(private statusCode: StatusCodes, private httpStatus: ReasonPhrases, private message: string, private data?: {}, private error?: {}){
        this.timeStamp = new Date().toLocaleString();
        this.statusCode = statusCode;
        this.httpStatus = httpStatus;
        this.message = message;
        this.data = data;
        this.error = error;
    }
}