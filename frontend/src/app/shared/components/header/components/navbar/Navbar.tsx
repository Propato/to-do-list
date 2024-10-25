import { Link } from "react-router-dom";
import { useAuthContext } from "../../../../context";
import { useCallback } from "react";

export const Navbar = () => {

    const { logout } = useAuthContext();

    const handleLogout = useCallback(() => {
        logout();
        window.location.reload();
    }, [logout]);

    return (
        <div className="container-md">
            <div className="row justify-content-center">
                <nav className="nav d-flex justify-content-end bg-primary shadow rounded py-1">
                    <Link className="nav-link text-light px-5" to="/">My Tasks</Link>
                    <Link className="nav-link text-light px-5" to="/user/profile">My Profile</Link>
                    <button className="nav-link text-light px-5"  onClick={handleLogout}>Logout</button>
                </nav>
        </div>
        </div>
    );
}