import { Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import grassrootLogo from '../../assets/image/Grassroot_Logo.png'
import { useContext, useState } from "react";
import { UserContext } from "../../App";
import '../../assets/css/style.css';


export default function Navbar() { // Check if props are received correctly
  const [auth, setAuth] = useState({ token: localStorage.getItem('token') });

  const { state, dispatch } = useContext(UserContext);

  const handleLogout = () => {
    console.log("clicked");
      localStorage.removeItem('token');
      setAuth({ token: null });
      dispatch({type: "USER", payload: false})
  };

  console.log("Auth token:", auth.token);

  const RenderMenu = () => {
    if(state){
      return (
        <>
        <Link to={"/"} className="nav-link" >Home</Link>
        <Link to={"/"} className="nav-link" >About</Link>
        <Link to={"/"} className="nav-link" >Contact</Link>
        <Link to={'/admin-panel'} className="nav-link" >Admin Panel</Link> 
        <Link to={'/'} className="nav-link" onClick={handleLogout} >Logout</Link>
        </>
      )
    } else{
      return (
        <>
        <Link to={"/"} className="nav-link">Home</Link>
        <Link to={"/"} className="nav-link">About</Link>
        <Link to={"/"} className="nav-link">Contact</Link>
        <Link to={'/admin-panel'} className="nav-link">Admin Panel</Link>
        <Link to={'/login'} onClick={handleLogout} className="nav-link">Login</Link> 
        </>
      )
    }
  }

  return (
    <Flex style={{ justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
      <Link to={'/'} style={{ width: '10rem' }}>
        <img src={grassrootLogo} width='100%' alt="Grassroot Logo" />
      </Link>
      <Flex gap={4}>
        <RenderMenu />
      </Flex>
    </Flex>
  )
}
