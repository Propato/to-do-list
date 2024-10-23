import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Tasks } from "../pages";

export {  }

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Tasks /> } />
                <Route path="*" element={ <Navigate to="/" /> } />
            </Routes>
        </BrowserRouter>
    );
}