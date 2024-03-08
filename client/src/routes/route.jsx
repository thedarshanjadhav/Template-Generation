import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import HomePage from "../pages/HomePage/HomePage";
import AdminPanel from "../pages/AdminPanel/AdminPanel";
import RegistrationFrom from "../components/Forms/RegistrationForm";

export const router = createBrowserRouter([
    {
        element: <AuthLayout />,
        children: [
            {
                path: '/',
                element: <HomePage />
            },
            {
                path: '/admin-panel',
                element: <AdminPanel />
            },
            {
                path: '/register',
                element: <RegistrationFrom />
            },
        ]
    }
])
