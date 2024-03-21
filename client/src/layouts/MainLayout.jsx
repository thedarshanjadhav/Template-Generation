import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

export default function MainLayout(){
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