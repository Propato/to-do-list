import * as create from "./create";
import * as get from "./get";
import * as update from "./update";
import * as deleteUser from "./delete";

export const UserController = {
    ...create,
    ...get,
    ...update,
    ...deleteUser,
}