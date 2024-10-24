export interface IHTTPResponse {
    timeStamp: Date
    statusCode: number,
    httpStatus: string,
    message: string,
    data: {
        token: string
    },
    error: {}
}

