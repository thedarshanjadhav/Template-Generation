import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { Show } from "@chakra-ui/react";
import MobNav from "../components/Navbar/MobNav";

export default function MainLayout(){
    return(
        <div className="main">
            <div className = "nav">
                <Show above='sm'>
                    <Navbar />
                </Show>
                <Show below='sm'>
                    <MobNav />
                </Show>
            </div>
        <div className="full-body">
            <Outlet />
        </div>
   </div>
    )
}