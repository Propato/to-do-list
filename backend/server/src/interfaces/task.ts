import * as yup from 'yup';

export interface ITask {
    taskId?: number,
    userId?: number,

    title: string,
    description?: string,
    deadline?: Date,
    status?: "pending" | "complete",
}

export const VTask: yup.ObjectSchema<ITask> = yup.object().shape({
    taskId:         yup.number().integer().moreThan(0).optional(),
    userId:         yup.number().integer().moreThan(0).optional(),

    title:          yup.string().min(3).max(100).required(),
    description:    yup.string().max(300).optional(),
    deadline:       yup.date().min(new Date()).optional(),
    status:         yup.string().oneOf(["pending", "complete"]).optional(),
});