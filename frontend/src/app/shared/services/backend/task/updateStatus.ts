import { db } from "../config";

export const updateStatus = async (id: number, complete: boolean): Promise<string | Error> => {
    try {
        
        const { data } = await db().put('/tasks/status', { taskId: id, status: complete ? "complete" : "pending"});
        console.log(data);

        if(data.statusCode === 200)
            return data.message;

        console.log("An error occurred");
        return new Error("An error occurred");

    } catch (error: any) {
        if (error.response.data.error) {
            console.log(error.response.data.error);

            let errors:string[] = [];

            (Object.values(error.response.data.error) as Array<Object>).forEach(element => {
                errors.push(...Object.values(element) as Array<string>);
            });
            console.log(errors);

            return new Error(JSON.stringify(errors));
        }
        
        if (error.response.data.message) {
            console.log(error.response.data.message);
            return new Error(JSON.stringify([error.response.data.message]));
        }

        console.log(error);
        return new Error(JSON.stringify([(error as { message: string }).message || "An error occurred"]));
    }
};