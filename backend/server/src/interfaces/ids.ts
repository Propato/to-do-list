import * as yup from 'yup';

export interface IUserId {
    userId: number | string
}

export const VUserId: yup.ObjectSchema<IUserId> = yup.object().shape({
    userId: yup.number().integer().moreThan(0).required()
});