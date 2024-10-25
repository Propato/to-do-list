import { Router } from 'express';
import { TaskController } from '../controllers';

const TaskRouter: Router = Router();

TaskRouter.route('/')
    .post(TaskController.validateCreate, TaskController.create)
    .put(TaskController.validateUpdate, TaskController.update);
    
TaskRouter.route('/task/:taskId')
    .delete(TaskController.validateDelete, TaskController.deleteTask)
    .get(TaskController.validateGet, TaskController.get);
    
TaskRouter.route('/status')
    .put(TaskController.validateUpdateStatus, TaskController.updateStatus);
    
TaskRouter.route('/search/:_text?:_status?:_LIMIT?:_PAG?')
    .get(TaskController.validateGetAllFiltered, TaskController.getAllFiltered)

    
export default TaskRouter;