import { useCallback, useEffect, useState } from "react";
import { LoggedLayout } from "../../shared/layout"
import { UserController } from "../../shared/services";
import { ModalError } from "../../shared/components";
import './Profile.css';
import { useAuthContext } from "../../shared/context";

export const Profile = () => {

    const { logout, isAuthenticated } = useAuthContext();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Array<string>>();

    useEffect(() => {
        UserController.get().then( user => { 
            if(!(user instanceof Error)){
                console.log(user);
                setName(user.name);
                setEmail(user.email);
            }
         }).catch( (error) => {
            console.error(error);
         });
    }, [isAuthenticated]);
    
    const handleDelete = useCallback(async () => {

		setLoading(true);
            const result = await UserController.deleteUser();
            
            if(typeof result === "string"){
                logout();
                window.location.reload();
            }

            setError(JSON.parse((result as Error).message));
            setLoading(false);
    }, [logout]);
    
    const handleUpdate = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();

		setLoading(true);
        if(password === repeatPassword){
            const result = await UserController.update({
                name: name,
                email: email,
                password: password
            })

            if(result instanceof Error){
                setError(JSON.parse(result.message));
            }
            else 
                window.location.reload();
        } else
            setError(["Passwords don't match"]);
		setLoading(false);

    }, [name, email, password, repeatPassword]);

    return (
        <LoggedLayout>
            <div className="py-4 container my-3 bg-secondary shadow-lg rounded">
                <div className="row justify-content-center">
                    <div className="col col-auto">
                        <h2 className=" my-1"> My Profile</h2>
                        <i className="bi bi-person-circle fs-custom"></i>
                    </div>
                </div>

                    { error && <div className="row justify-content-center">
                        <div className="col col-auto">
                            <ModalError messages={ error || "An erro occurred" } />
                        </div>
                    </div>}

                    <form className="" onSubmit={(e) => handleUpdate(e)}>
                    <div className="row row-cols-auto justify-content-center mb-3">
                        <div className="mb-3 col col-auto">
                            <label htmlFor="InputName" className="form-label">Name</label>
                            <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value) } required disabled={loading} className="form-control" id="InputName" aria-describedby="nameHelp"></input>
                        </div>

                        <div className="mb-3 col col-auto">
                            <label htmlFor="InputEmail1" className="form-label">Email address</label>
                            <input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value) } required disabled={loading} className="form-control" id="InputEmail1" aria-describedby="emailHelp"></input>
                        </div>
                    </div>
                    <div className="row row-cols-auto justify-content-center mb-3">
                        <div className="mb-3 col col-auto">
                            <label htmlFor="newPassword" className="form-label">New password</label>
                            <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value) } required disabled={loading} className="form-control" id="newPassword"></input>
                        </div>
                        <div className="mb-3 col col-auto">
                            <label htmlFor="confirmNewPassword" className="form-label">Repeat new password</label>
                            <input type="password" placeholder="password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value) } required disabled={loading} className="form-control" id="confirmNewPassword"></input>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col col-auto">
                            <button type="submit" disabled={loading} className="btn btn-primary w-100 px-4">Update</button>
                            <button type="button" disabled={loading} className="btn btn-danger my-3 w-100 px-4" onClick={handleDelete}>
                                <i className="bi bi-trash px-1"></i>
                                <span>
                                    Delete
                                </span>
                            </button>
                        </div>
                    </div>
                    </form>
                </div>
        </LoggedLayout>
    )
}