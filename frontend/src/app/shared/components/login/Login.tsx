import { useCallback, useState } from "react";
import { useAuthContext } from "../../context";
import { useNavigate } from "react-router-dom";
import { ModalError } from "../modalError/ModalError";

export const Login: React.FC<{ children: React.ReactNode }> = ({ children }) => {

	const { isAuthenticated, login } = useAuthContext();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string[]>();
    
    const navigate = useNavigate();

    const handleRegister = useCallback(() => {
        navigate('/user/new');
    }, [navigate])
    
    const handleLogin = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        
		setLoading(true);
        const result = await login(email, password)
		
		if(result)
			setError(result);
		setLoading(false);

    }, [email, password, login]);

	if (isAuthenticated) return ( <>{children}</> );

    return (
        <div className="min-vh-100 py-4 d-flex align-items-center justify-content-center">
            <div>
                <img className="" src="https://www.athenas.com.br/wp-content/uploads/elementor/thumbs/Group-3-2-pwjfp5c8f7l5h30p4wc7gz6bc06p3nzfjyuhsdliww.png" alt="Athenas Tecnologia Logo" height={50}/>

                <h2 className="my-4">Log In</h2>

                { error && <ModalError messages={ error || "An erro occurred" } /> }

                <form className="" onSubmit={(e) => handleLogin(e)}>
                    <div className="mb-3">
                        <label htmlFor="InputEmail1" className="form-label">Email address</label>
                        <input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value) } required autoFocus disabled={loading} className="form-control" id="InputEmail1" aria-describedby="emailHelp"></input>
                        
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="InputPassword1" className="form-label">Password</label>
                        <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value) } required disabled={loading} className="form-control" id="InputPassword1"></input>
                    </div>
                    <div className="d-flex align-items-center justify-content-evenly">
                        <button type="submit" disabled={loading} className="btn btn-primary">Login</button>
                        <button type="button" disabled={loading} onClick={handleRegister}className="btn btn-primary">Register</button>
                    </div>
                </form>
                {/* <Error open={!!error} message={error || "null"}/> */}
            </div>
        </div>
    );
}