import * as yup from 'yup';

export interface IStatus {
    taskId: number,
    status: "pending" | "complete",
}

export const VStatus: yup.ObjectSchema<IStatus> = yup.object().shape({
    taskId:         yup.number().integer().moreThan(0).required(),
    status:         yup.string().oneOf(["pending", "complete"]).required(),
});