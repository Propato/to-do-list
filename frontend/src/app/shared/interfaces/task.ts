export interface ITask {
    taskId?: number,
    userId?: number,

    title: string,
    description?: string,
    deadline?: Date,
    status?: "pending" | "complete",
}