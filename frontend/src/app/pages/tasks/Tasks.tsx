import { Link } from "react-router-dom";
import { ITask } from "../../shared/interfaces";
import { LoggedLayout } from "../../shared/layout";
import { Table } from "./components/Table";
import { useCallback, useEffect, useState } from "react";
import { TaskController } from "../../shared/services";
import { useAuthContext } from "../../shared/context";
import { ModalError } from "../../shared/components";

export const Tasks = () => {

    const { isAuthenticated } = useAuthContext();
    
    const [tasks, setTasks] = useState<ITask[]>([]); 
    const [error, setError] = useState<Array<string>>();

    useEffect(() => {
        TaskController.search().then( tasks => { 
            if(!(tasks instanceof Error)){
                console.log(tasks);
                setTasks(tasks as unknown as ITask[]);
            }
         }).catch( (error) => {
            console.error(error);
         });
    }, [isAuthenticated]);

    const handleDelete = useCallback( (id: number) => {
        TaskController.deleteTask(id).then(result => {
            if (result instanceof Error) {
                setError([result.message]);
            } else {
                setTasks(oldTasks => [
                    ...oldTasks.filter(oldTask => oldTask.taskId !== id),
                ]);
            }
        });
      }, []);

    const handleUpdate = useCallback( (id: number, complete: boolean) => {
        TaskController.updateStatus(id, complete).then(result => {
            if (result instanceof Error)
                setError([result.message]);
            else {
                setTasks(oldTasks => 
                    oldTasks.map(task => 
                        task.taskId === id ? { ...task, status: complete ? "complete" : "pending" } : task
                    )
                );
            }
            });
      }, []);

    return (
        <LoggedLayout>
            <div className="container-md py-1">
            <Link to="/task/new" className="btn btn-success px-4 py-2 my-3">
                <i className="bi bi-plus-square-fill mx-2"></i>
                <span className="mx-3">
                    New
                </span>
            </Link>
            
            { error && <ModalError messages={ error || "An erro occurred" } /> }

            <Table tasks={tasks} deleteFunc={handleDelete} updateFunc={handleUpdate} />
            </div>
        </LoggedLayout>
    );
}