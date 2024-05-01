import { Flex } from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import grassrootLogo from '../../assets/image/Grassroot_Logo.png'
import { useContext, useState } from "react";
import { UserContext } from "../../App";


export default function Navbar() { // Check if props are received correctly

  const navigate = useNavigate();
  const [auth, setAuth] = useState({ token: localStorage.getItem('token') });

  const { state, dispatch } = useContext(UserContext);

  const handleLogout = () => {
    console.log("clicked");
      localStorage.removeItem('token');
      setAuth({ token: null });
      dispatch({type: "USER", payload: false});
      navigate('/');
  };

  console.log("Auth token:", auth.token);




  const RenderMenu = () => {
    const { pathname } = useLocation(); // Import useLocation hook from react-router-dom

    if (state) {
        return (
            <>
                <Link to={"/"} className={`nav-link ${pathname === "/" ? "active" : ""}`}>Home</Link>
                <Link to={"/about"} className={`nav-link ${pathname === "/about" ? "active" : ""}`}>About</Link>
                <Link to={"/contact"} className={`nav-link ${pathname === "/contact" ? "active" : ""}`}>Contact</Link>
                <Link to={'/admin-panel'} className={`nav-link ${pathname === "/admin-panel" ? "active" : ""}`}>Admin Panel</Link>
                <Link to={'/'} className="nav-link" onClick={handleLogout}>Logout</Link>
            </>
        )
    } else {
        return (
            <>
                <Link to={"/"} className={`nav-link ${pathname === "/" ? "active" : ""}`}>Home</Link>
                <Link to={"/about"} className={`nav-link ${pathname === "/about" ? "active" : ""}`}>About</Link>
                <Link to={"/contact"} className={`nav-link ${pathname === "/contact" ? "active" : ""}`}>Contact</Link>
                <Link to={'/admin-panel'} className={`nav-link ${pathname === "/admin-panel" ? "active" : ""}`}>Admin Panel</Link>
                <Link to={'/login'} className={`nav-link ${pathname === "/login" ? "active" : ""}`} onClick={handleLogout}>Login</Link>
            </>
        )
    }
  }

  return (
    <Flex style={{ justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
      <Link to={'/'} style={{ width: '10rem' }}>
        <img src={grassrootLogo} width='100%' alt="Grassroot Logo" />
      </Link>
      <Flex gap={4} >
        <RenderMenu />
      </Flex>
    </Flex>
  )
}
