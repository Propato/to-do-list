import * as yup from 'yup';

export interface IFilter {
    _text?: string,
    _status?: "pending" | "complete" | "%",
    _LIMIT?: number,
    _PAG?: number
}

export const VFilter: yup.ObjectSchema<IFilter> = yup.object().shape({
    _text:          yup.string().max(300).default("%").optional(),
    _status:         yup.string().oneOf(["pending", "complete", "%"]).default("%").optional(),
    _LIMIT:          yup.number().integer().moreThan(0).default(10).optional(),
    _PAG:         yup.number().integer().min(0).default(0).optional()
});