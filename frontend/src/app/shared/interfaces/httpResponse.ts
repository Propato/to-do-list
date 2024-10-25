export interface IHTTPResponse {
    timeStamp: Date
    statusCode: number,
    httpStatus: string,
    message: string,
    data?: {
        token?: string
    },
    error?: {
        body?: {
            name?: string,
            email?: string,
            password?: string,
            deadline?: string
        }
    }
}

