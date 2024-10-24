import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Register, Tasks } from "../pages";

export {  }

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element= { <Register /> } />
                <Route path="/tasks" element= { <Tasks /> } />

                <Route path="*" element= { <Navigate to="/" /> } />
            </Routes>
        </BrowserRouter>
    );
}