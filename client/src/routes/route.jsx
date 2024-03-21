import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import HomePage from "../pages/HomePage/HomePage";
import AdminPanel from "../pages/AdminPanel/AdminPanel";

import LoginFrom from "../components/Forms/LoginForm";
import MainLayout from "../layouts/MainLayout";

export const router = createBrowserRouter([
    {
        element:< MainLayout />,
        children:[
            {
                path: '/',
                element: <HomePage />
            },
            {
                path: '/login',
                element: <LoginFrom />
            },
        ]
    },
    {
        element: <AuthLayout />,
        children: [
            {
                path: '/admin-panel',
                element: <AdminPanel />
            },
          
        ]
    }
])
