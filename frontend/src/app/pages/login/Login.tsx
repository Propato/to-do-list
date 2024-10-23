import { useCallback, useState } from "react";

export const Login = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleLogin = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        
        console.log(email);
        console.log(password);
    }, [email, password]);

    return (
        <div>
            <img src="" alt="Athenas Tecnologia Logo"/>
            <form onSubmit={(e) => handleLogin(e)}>
                <label>
                    <span>Email</span>
                    <input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value) } required autoFocus></input>
                </label>
                <label>
                    <span>Password</span>
                    <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value) } required ></input>
                </label>

                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    );
}