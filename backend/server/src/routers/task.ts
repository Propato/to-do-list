import { Router } from 'express';
import { TaskController } from '../controllers';

const TaskRouter: Router = Router();

TaskRouter.route('/')
    .post(TaskController.validateCreate, TaskController.create)
    .get(TaskController.validateGetAllFiltered, TaskController.getAllFiltered)
    .put(TaskController.validateUpdate, TaskController.update);

TaskRouter.route('/:taskId')
    .delete(TaskController.validateDelete, TaskController.deleteTask);
    
TaskRouter.route('/status')
    .put(TaskController.validateUpdateStatus, TaskController.updateStatus);
    
export default TaskRouter;