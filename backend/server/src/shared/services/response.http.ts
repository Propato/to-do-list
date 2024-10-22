import { Code } from "../enums/code";
import { Status } from "../enums/status";

export class HttpResponse{
    private timeStamp: string;
    constructor(private statusCode: Code, private httpStatus: Status, private message: string, private data?: {}, private error?: {}){
        this.timeStamp = new Date().toLocaleString();
        this.statusCode = statusCode;
        this.httpStatus = httpStatus;
        this.message = message;
        this.data = data;
        this.error = error;
    }
}