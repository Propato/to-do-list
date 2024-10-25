import * as create from "./create";
import * as search from "./search";
import * as get from "./get";
import * as update from "./update";
import * as updateStatus from "./updateStatus";
import * as deleteTask from "./delete";

export const TaskController = {
    ...create,
    ...get,
    ...search,
    ...update,
    ...updateStatus,
    ...deleteTask,
}