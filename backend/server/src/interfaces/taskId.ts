import * as yup from 'yup';

export interface ITaskId {
    taskId: number | string
}

export const VTaskId: yup.ObjectSchema<ITaskId> = yup.object().shape({
    taskId:     yup.number().integer().moreThan(0).required()
});