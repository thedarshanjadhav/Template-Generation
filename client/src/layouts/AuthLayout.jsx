import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { Show } from "@chakra-ui/react";

export default function AuthLayout() {
    const token = localStorage.getItem('token');

    // Redirect to login if no token or token is 'null'
    if (!token || token === 'null') {
        return <Navigate to="/login" />;
    }

    // If token is present, render the admin panel
    return (
        <div className="main">
            <Show above='sm'>
                <div className="nav">
                    <Navbar />
                </div>
            </Show>

            <div className="full-body">
                <Outlet />
            </div>
        </div>
    );
}
