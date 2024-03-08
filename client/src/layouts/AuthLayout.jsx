import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import '../components/styles/style.css'

export default function AuthLayout(){
    return(
        <div className="main">
            <div className = "nav">
                <Navbar />
            </div>
            <div className="full-body">
                <Outlet />
            </div>
       </div>
    )
}