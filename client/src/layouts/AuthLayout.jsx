import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
// import '../components/styles/style.css'

// import { useEffect} from "react";
// import { useSelector } from "react-redux";

export default function AuthLayout(){

    // const navigate = useNavigate();
    // const {auth} = useSelector((state) => state.auth)

    // useEffect(() => {
    //     if(!auth.isLoggedIn){
    //         navigate('/login');
    //     }
    // }, [auth.isLoggedIn, navigate]);


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