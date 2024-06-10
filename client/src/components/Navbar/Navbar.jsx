import { Flex } from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import grassrootLogo from '../../assets/image/Grassroot_Logo.png';
import { useContext } from "react";
import { UserContext } from "../../App";

export default function Navbar() {
    const navigate = useNavigate();
    const { state, dispatch } = useContext(UserContext);

    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch({ type: "USER", payload: false });
        navigate('/');
    };

    const RenderMenu = () => {
        const { pathname } = useLocation();

        if (state.isAuthenticated) {
            return (
                <>
                    <Link to={"/"} className={`nav-link ${pathname === "/" ? "active" : ""}`}>Home</Link>
                    <Link to={'/admin-panel'} className={`nav-link ${pathname === "/admin-panel" ? "active" : ""}`}>Admin Panel</Link>
                    <Link to={'/'} className="nav-link" onClick={handleLogout}>Logout</Link>
                </>
            );
        } else {
            return (
                <>
                    <Link to={"/"} className={`nav-link ${pathname === "/" ? "active" : ""}`}>Home</Link>
                    <Link to={'/admin-panel'} className={`nav-link ${pathname === "/admin-panel" ? "active" : ""}`}>Admin Panel</Link>
                    <Link to={'/login'} className={`nav-link ${pathname === "/login" ? "active" : ""}`}>Login</Link>
                </>
            );
        }
    };

    return (
        <Flex style={{ justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
            <Link to={'/'} style={{ width: '10rem' }}>
                <img src={grassrootLogo} width='100%' alt="Grassroot Logo" />
            </Link>
            <Flex gap={4}>
                <RenderMenu />
            </Flex>
        </Flex>
    );
}
