import {  Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, useDisclosure } from "@chakra-ui/react";
import {HamburgerIcon} from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import grassrootLogo from '../../assets/image/Grassroot_Logo.png'
import { useContext, useRef, useState } from "react";
import { UserContext } from "../../App";


export default function MobNav() { // Check if props are received correctly

    const navigate = useNavigate();

  const [auth, setAuth] = useState({ token: localStorage.getItem('token') });

  const { state, dispatch } = useContext(UserContext);

  const handleLogout = () => {
    console.log("clicked");
      localStorage.removeItem('token');
      setAuth({ token: null });
      dispatch({type: "USER", payload: false})
      navigate('/');
  };

  console.log("Auth token:", auth.token);


  const handleLogoutAndClose = () => {
    handleLogout();
    onClose();
  };

  const RenderMenu = () => {
    if(state){
      return (
        <>
        <Link to={'/'} className="nav-link" onClick={handleLogoutAndClose} >Logout</Link> <br />
        </>
      )
    } else{
      return (
        <>
        <Link to={'/login'} onClick={handleLogoutAndClose} className="nav-link">Login</Link> 
        </>
      )
    }
  }

  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  return (
    <Flex style={{ justifyContent: 'space-between', alignItems: 'center', height: '4rem' }}>
      <Link to={'/'} style={{ width: '10rem' }}>
        <img src={grassrootLogo} width='100%' alt="Grassroot Logo" />
      </Link>
      <Flex gap={4}>
        {/* Menu bar */}
        <HamburgerIcon onClick={onOpen}/>

        {/* Drawer for menu */}
        <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
            finalFocusRef={btnRef}
        >
            <DrawerOverlay />
            <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader style={{borderBottom:'1px solid black'}}> Welcome to Grassroot Properties</DrawerHeader> 

            <DrawerBody>
                <Link to={"/"} className="nav-link" onClick={onClose} >Home</Link> <br />
                <Link to={"/"} className="nav-link" onClick={onClose} >About</Link> <br />
                <Link to={"/"} className="nav-link" onClick={onClose} >Contact</Link> <br />
                <Link to={'/admin-panel'} className="nav-link" onClick={onClose}>Admin Panel</Link>  <br />
            </DrawerBody>

            <DrawerFooter>
               <RenderMenu />
            </DrawerFooter>
            </DrawerContent>
        </Drawer>
      </Flex>
    </Flex>
  )
}
