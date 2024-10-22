import * as yup from 'yup';

export interface ILogin {
    email:string,
    passhash: string
}
export const VLogin: yup.ObjectSchema<ILogin> = yup.object().shape({
    email: yup.string().email().min(5).max(60).required(),
    passhash: yup.string().min(8).required()
});