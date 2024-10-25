import { useCallback, useEffect, useState } from "react";
import { LoggedLayout } from "../../shared/layout"
import { TaskController } from "../../shared/services";
import { ModalError } from "../../shared/components";
import { Link, useNavigate, useParams } from "react-router-dom";

export const EditTask = () => {

    const navigate = useNavigate();
    const { taskId } = useParams();
    
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [status, setStatus] = useState("pending");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Array<string>>();

    useEffect(() => {
        TaskController.get(Number(taskId)).then((task) => {
            if(task instanceof Error)
                setError(JSON.parse(task.message));
            else {
                setTitle(task.title || "");
                setDescription(task.description || "");
                setDeadline(task.deadline || "");
                setStatus(task.status || "pending");
            }
            console.log(task)
        });
    }, [taskId]);
    
    const handleUpdate = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();

		setLoading(true);
        const result = await TaskController.update({
            taskId: Number(taskId || "0"),
            title: title,
            description: description,
            deadline: deadline,
            status: status as ("pending" | "complete" | undefined)
        });

        if(result instanceof Error)
            setError(JSON.parse(result.message));
        else 
            navigate("/");
		setLoading(false);

    }, [title, description, deadline, status, taskId, navigate]);

    return (
        <LoggedLayout>
            <div className="py-4 container my-3 bg-secondary shadow-lg rounded">
                <div className="row justify-content-center ">
                    <div className="col col-auto">
                        <h2 className=" mb-3"> {title || "Title"} </h2>
                    </div>
                </div>

                    { error && <div className="row justify-content-center">
                        <div className="col col-auto">
                            <ModalError messages={ error || "An erro occurred" } />
                        </div>
                    </div>}

                    <form onSubmit={(e) => handleUpdate(e)}>
                        <div className="row row-cols-auto justify-content-center mb-3">
                            <div className="mb-3 col col-auto">
                                <label htmlFor="InputTitle" className="form-label">Title</label>
                                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value) } required autoFocus disabled={loading} className="form-control" id="InputTitle"></input>
                            </div>

                            <div className="mb-3 col col-auto">
                                <label htmlFor="InputDescription" className="form-label">Description</label>
                                <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value) } disabled={loading} className="form-control" id="InputDescription"></input>
                            </div>
                        </div>

                        <div className="row row-cols-auto justify-content-center mb-3">
                            <div className="mb-3 col col-auto">
                                <label htmlFor="InputStatus" className="form-label">Status</label>
                                <select className="form-control" id="InputStatus" disabled={loading} value={status} onChange={(e) => setStatus(e.target.value) }>
                                    <option value="pending">Pending</option>
                                    <option value="complete">Complete</option>
                                </select>
                            </div>
                            <div className="mb-3 col col-auto">
                                <label htmlFor="InputDeadline" className="form-label">Deadline</label>
                                <input type="date" placeholder="date" value={deadline.split('T')[0]} onChange={(e) => setDeadline(new Date(e.target.value).toISOString().split('T')[0]) } required disabled={loading} className="form-control" id="InputDeadline"></input>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col col-auto">
                                <button type="submit" disabled={loading} className="btn btn-primary w-100 px-4">
                                    Save & Close
                                </button>
                                <Link to="/" className="btn btn-danger my-3 w-100 px-4">
                                    <i className="bi bi-x-circle px-1"></i>
                                    <span className="px-1">
                                        Cancel
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
        </LoggedLayout>
    )
}