import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { useState } from "react";

export default function AuthLayout() {
    const [auth] = useState({ token: localStorage.getItem('token') });



    console.log("Auth token:", auth.token);

    // Redirect to login if no token or token is 'null'
    if (!auth.token || auth.token === 'null') {
        return <Navigate to="/login" />;
    }

    // If token is present, render the admin panel
    return (
        <div className="main">
            <div className="nav">
                <Navbar />
            </div>

            <div className="full-body">
                <Outlet />
            </div>
        </div>
    );
}
