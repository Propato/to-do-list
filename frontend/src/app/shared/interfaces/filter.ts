export interface IFilter {
    title?: string,
    description?: string,
    status?: "pending" | "complete" | "%",
    LIMIT?: number,
    OFFSET?: number
}