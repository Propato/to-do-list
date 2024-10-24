import { useCallback, useState } from "react";
import { useAuthContext } from "../context";

export const Login: React.FC<{ children: React.ReactNode }> = ({ children }) => {

	const { isAuthenticated, login } = useAuthContext();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>();
    
    const handleLogin = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        
        console.log(email);
        console.log(password);

		setLoading(true);
        const result = await login(email, password)
		
		if(result)
			setError(result);
		setLoading(false);

    }, [email, password, login]);

	if (isAuthenticated) return ( <>{children}</> );

    return (
        <div>
            <img src="" alt="Athenas Tecnologia Logo"/>
            <form onSubmit={(e) => handleLogin(e)}>
                <label>
                    <span>Email</span>
                    <input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value) } required autoFocus disabled={loading}></input>
                </label>
                <label>
                    <span>Password</span>
                    <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value) } required disabled={loading}></input>
                </label>

                <button type="submit" disabled={loading}>
                    Login
                </button>
            </form>
        </div>
    );
}