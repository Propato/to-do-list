export interface ITask {
    taskId?: number,
    userId?: number,

    title: string,
    description?: string,
    deadline?: string,
    status?: "pending" | "complete",
}