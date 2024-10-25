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

    const [search, setSearch] = useState("");
    const [limit, setLimit] = useState(10);
    const [pag, setPag] = useState(1);
    const [searchStatus, setSearchStatus] = useState<"%" | "pending" | "complete">("%");

    useEffect(() => {
        TaskController.search({
                _text: search,
                _status: searchStatus,
                _LIMIT: limit, 
                _PAG: pag
            }).then( tasks => { 
                if(!(tasks instanceof Error)){
                    console.log(tasks);
                    setTasks(tasks as unknown as ITask[]);
                }
            }).catch( (error) => {
                console.error(error);
            });
    }, [isAuthenticated, search, limit, pag, searchStatus]);

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

    const handleUpdateStatus = useCallback( (id: number, complete: boolean) => {
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

            <div className="container-sm">
                <div className="col col-2">
                    <select className="form-select" value={searchStatus} onChange={(e) => setSearchStatus(e.target.value as "%" | "pending" | "complete") }>
                        <option value="pending">Pending</option>
                        <option value="complete">Complete</option>
                        <option value="%">All</option>
                    </select>
                </div>
                <div className="col col-6">
                    <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value) } className="form-control" />
                </div>
            </div>

            <Link to="/task/new" className="btn btn-success px-4 py-2 my-3">
                <i className="bi bi-plus-square-fill mx-2"></i>
                <span className="mx-3">
                    New
                </span>
            </Link>
            
            { error && <ModalError messages={ error || "An erro occurred" } /> }

            <Table tasks={tasks} deleteFunc={handleDelete} updateFunc={handleUpdateStatus} />
            </div>
        </LoggedLayout>
    );
}