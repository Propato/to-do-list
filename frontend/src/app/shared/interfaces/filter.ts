export interface IFilter {
    _text?: string,
    _status?: "pending" | "complete" | "%",
    _LIMIT?: number,
    _PAG?: number
}