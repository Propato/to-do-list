import * as yup from 'yup';

export interface IUser {
    id?: number,

    name: string,
    email: string,
    password: string
}
export const VUser: yup.ObjectSchema<IUser> = yup.object().shape({
    id:         yup.number().integer().moreThan(0).optional(),

    name:       yup.string().min(2).max(50).required(),
    email:      yup.string().email().min(5).max(60).required(),
    password:   yup.string().min(8).max(30).required()
});