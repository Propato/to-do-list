import { Link } from "react-router-dom";
import { ITask } from "../../shared/interfaces";
import { LoggedLayout } from "../../shared/layout";
import { Table } from "./components/Table";
import { useCallback, useEffect, useState } from "react";
import { TaskController } from "../../shared/services";
import { useAuthContext } from "../../shared/context";
import { ModalError } from "../../shared/components";
import { useDebounce } from "../../shared/hooks";

export const Tasks = () => {

    const { isAuthenticated } = useAuthContext();
    const { debounce } = useDebounce(); // Wait for the user to stop giving inputs to perform the search.
    
    const [tasks, setTasks] = useState<ITask[]>([]); 
    const [error, setError] = useState<Array<string>>();

    const [search, setSearch] = useState("");
    const [limit, setLimit] = useState(5);
    const [pag, setPag] = useState(1);
    const [searchStatus, setSearchStatus] = useState<"%" | "pending" | "complete">("%");

    useEffect(() => {
        // Wait for the user to stop giving inputs to perform the search.
        debounce(
            () => { TaskController.search({
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
            }
        )
    }, [isAuthenticated, search, limit, pag, searchStatus, debounce]);

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

    const changePag = useCallback( (newPag: number) => {
        if(newPag === -1 && pag === 1) return;
        if(newPag === 1 && !(tasks.length)) return;
        
        newPag += pag;
        setPag(newPag);
    }, [tasks, pag]);

    return (
        <LoggedLayout>
            <div className="container-md py-1">
                <div className="container-sm">

                    <div className="row justify-content-center mt-3">
                        <div className="col col-6">
                            <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value) } className="form-control" />
                        </div>
                    </div>

                    <div className="row justify-content-center mt-2">
                        <div className="col col-2">
                            <select className="form-select" value={searchStatus} onChange={(e) => setSearchStatus(e.target.value as "%" | "pending" | "complete") }>
                                <option value="pending">Pending</option>
                                <option value="complete">Complete</option>
                                <option value="%">All</option>
                            </select>
                        </div>
                        <div className="col col-1">
                            <select className="form-select" value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="30">30</option>
                                <option value="40">40</option>
                                <option value="50">50</option>
                            </select>
                        </div>
                    </div>
                </div>

                <Link to="/task/new" className="btn btn-success px-4 mb-2">
                    <i className="bi bi-plus-square-fill mx-2"></i>
                    <span className="mx-3">
                        New
                    </span>
                </Link>
                
                { error && <ModalError messages={ error || "An erro occurred" } /> }

                <Table tasks={tasks} deleteFunc={handleDelete} updateFunc={handleUpdateStatus} />

                <div className="container-sm">
                    <div className="row justify-content-center mb-5 mt-2">
                        <div className="col col-1">
                            <div className="d-flex justify-content-center alight-items-center" role="button" onClick={() => changePag(-1)}>
                                <i className="bi bi-chevron-left fs-3"></i>
                            </div>
                        </div>
                        <div className="col col-1">
                            <div className="d-flex justify-content-center alight-items-center" role="button" onClick={() => { changePag(1) }}>
                                <i className=" bi bi-chevron-right fs-3"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LoggedLayout>
    );
}