import * as yup from 'yup';

export interface ILogin {
    email: string,
    password: string
}
export const VLogin: yup.ObjectSchema<ILogin> = yup.object().shape({
    email:      yup.string().email().min(5).max(60).required(),
    password:   yup.string().min(8).max(30).required()
});