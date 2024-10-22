import { Router } from 'express';
import { UserController } from '../controllers';

const UserRouter: Router = Router();

UserRouter.route('/')
    .post(UserController.validateCreate, UserController.create);

UserRouter.route('/:userId')
    .get(UserController.validateGet, UserController.get)
    .put(UserController.validateUpdate, UserController.update)
    .delete(UserController.validateDelete, UserController.deleteUser);

export default UserRouter;