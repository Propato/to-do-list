import * as create from "./create";
import * as get from "./get";
import * as getAll from "./get.all";
import * as update from "./update";
import * as deleteUser from "./delete";
import * as login from "./login";

export const UserController = {
    ...create,
    ...get,
    ...update,
    ...deleteUser,
    ...login,
    ...getAll
}