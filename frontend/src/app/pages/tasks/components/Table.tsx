import { ITask } from "../../../shared/interfaces";
import { Link } from "react-router-dom";

interface props {
    tasks: ITask[],
    deleteFunc: (id: number) => void
    updateFunc: (id: number, complete: boolean) => void
}
export const Table: React.FC<props> = ({ tasks, deleteFunc, updateFunc }) => {

    const today = new Date();

    return (
    <div className="row justify-content-center">
        <div className="col table-responsive">
            <table className="table table-Dark">
                <thead className="align-middle">
                    <tr>
                        <th className="d-flex alight-items-center justify-content-center">Edite</th>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Deadline</th>
                        <th>Status</th>
                        <th className="d-flex alight-items-center justify-content-center">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    { tasks && tasks.map( (task) => {
                        let style = "";
                        let status = false;
                        let overdue = true;

                        if(task.deadline && new Date(task.deadline) > today){
                            style = "warning";
                            overdue = false;
                        } else {
                            style = "danger";
                            overdue = true;
                        }

                        if(task.status === "complete"){
                            style = "success";
                            status = true;
                        }
                        if(task.deadline)
                            task.deadline = new Date(task.deadline).toISOString().split('T')[0]

                        return (
                        <tr key={task.taskId} className={`table table-${style} align-middle`}>
                            <td>
                                <Link to={`/task/edit/${task.taskId}`} className="d-flex alight-items-center justify-content-center">
                                    <i className="bi bi-pencil-square fs-5"></i>
                                </Link>
                            </td>

                            <th>{task.taskId || ""}</th>
                            <td>{task.title || ""}</td>
                            <td>{task.description || ""}</td>
                            <td>{String(task.deadline) || ""}</td>
                            <td>
                                <input onChange={(e) => updateFunc(task.taskId as number, e.target.checked) } className="form-check-input" type="checkbox" defaultChecked={status} disabled={overdue} id="flexCheckDefault"></input>
                            </td>
                            <td onClick={() => { deleteFunc(task.taskId as number) }} className="bg-danger" role="button">
                                <div className="d-flex alight-items-center justify-content-center">
                                    <i className="bi bi-trash bg-danger fs-5"></i>
                                </div>
                            </td>
                        </tr>
                        )}
                    )}
                </tbody>
            </table>
        </div>
    </div>
    );
}