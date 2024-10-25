import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { EditTask, RegisterTask, RegisterUser, Tasks } from "../pages";
import { Profile } from "../pages/profile/Profile";

export {  }

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element= { <Tasks /> } />
                <Route path="/user/profile" element= { <Profile /> } />
                
                <Route path="/user/new" element= { <RegisterUser /> } />
                <Route path="/task/new" element= { <RegisterTask /> } />
                <Route path="/task/edit/:taskId" element= { <EditTask /> } />

                <Route path="*" element= { <Navigate to="/" /> } />
            </Routes>
        </BrowserRouter>
    );
}