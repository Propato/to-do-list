import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserController } from "../../shared/services";
import { ModalError } from "../../shared/components";

export const RegisterUser = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Array<string>>();
    
    const navigate = useNavigate();

    const handleLogin = useCallback(() => {
        navigate('/');
    }, [navigate])

    const handleRegister = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();

        console.log(name, email, password, repeatPassword);
        
		setLoading(true);
        if(password === repeatPassword){
            console.log(password, repeatPassword);
            const result = await UserController.create({
                name: name,
                email: email,
                password: password
            })

            if(result instanceof Error){
                setError(JSON.parse(result.message));
            }
            else 
                navigate('/');
        } else
            setError(["Passwords don't match"]);
		setLoading(false);

    }, [name, email, password, repeatPassword, navigate]);

    return (
        <div className="min-vh-100 py-4 d-flex align-items-center justify-content-center">
            <div>
                <img className="" src="https://www.athenas.com.br/wp-content/uploads/elementor/thumbs/Group-3-2-pwjfp5c8f7l5h30p4wc7gz6bc06p3nzfjyuhsdliww.png" alt="Athenas Tecnologia Logo" height={50}/>

                <h2 className="my-3">Register</h2>

                { error && <ModalError messages={ error || "An erro occurred" } /> }

                <form className="" onSubmit={(e) => handleRegister(e)}>
                    <div className="mb-3">
                        <label htmlFor="InputName" className="form-label">Name</label>
                        <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value) } required autoFocus disabled={loading} className="form-control" id="InputName" aria-describedby="nameHelp"></input>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="InputEmail1" className="form-label">Email address</label>
                        <input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value) } required disabled={loading} className="form-control" id="InputEmail1" aria-describedby="emailHelp"></input>
                        
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="InputPassword1" className="form-label">Password</label>
                        <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value) } required disabled={loading} className="form-control" id="InputPassword1"></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="InputConfirmPassword1" className="form-label">Repeat password</label>
                        <input type="password" placeholder="password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value) } required disabled={loading} className="form-control" id="InputConfirmPassword1"></input>
                    </div>

                    <div className="d-flex align-items-center justify-content-evenly">
                        <button type="submit" disabled={loading} className="btn btn-primary">Register</button>
                        <button type="button" disabled={loading} onClick={handleLogin} className="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}