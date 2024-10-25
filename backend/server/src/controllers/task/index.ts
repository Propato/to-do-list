import * as create from "./create";
import * as getAll from "./get.all";
import * as get from "./get";
import * as update from "./update";
import * as updateStatus from "./update.status";
import * as deleteTask from "./delete";

export const TaskController = {
    ...create,
    ...update,
    ...updateStatus,
    ...deleteTask,
    ...getAll,
    ...get,
}