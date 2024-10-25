import * as yup from 'yup';

export interface IFilter {
    title?: string,
    description?: string,
    status?: "pending" | "complete" | "%",
    LIMIT?: number,
    OFFSET?: number
}

export const VFilter: yup.ObjectSchema<IFilter> = yup.object().shape({
    title:          yup.string().max(300).default("%").optional(),
    description:    yup.string().max(300).default("%").optional(),
    status:         yup.string().oneOf(["pending", "complete", "%"]).default("%").optional(),
    LIMIT:          yup.number().integer().moreThan(0).default(10).optional(),
    OFFSET:         yup.number().integer().min(0).default(0).optional()
});