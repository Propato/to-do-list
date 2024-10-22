import { Router } from 'express';
import { UserController } from '../controllers';
import { authentication } from '../shared/middlewares';

const UserRouter: Router = Router();

UserRouter.route('/')
    .post(UserController.validateCreate, UserController.create)
    .get(authentication, UserController.validateGet, UserController.get)
    .put(authentication, UserController.validateUpdate, UserController.update)
    .delete(authentication, UserController.validateDelete, UserController.deleteUser);
    
UserRouter.route('/login')
    .get(UserController.validateLogin, UserController.login);

// Este é um método puramente auxiliar para visualizar os dados.
if(process.env.APP_MODE === "dev")
UserRouter.route('/all')
    .get(UserController.getAll);


export default UserRouter;