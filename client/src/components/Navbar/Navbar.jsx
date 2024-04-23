import { Flex,  } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import '../../assets/css/style.css'
import grassrootLogo from '../../assets/image/Grassroot_Logo.png'

export default function Navbar(){

    return(
      <Flex style={{justifyContent:'space-between', alignItems:'center', height:'100%'}}>
        <Link to={'/'} style={{width: '10rem'}}>
          <img src={grassrootLogo} width='100%'></img>
        </Link>
        <Link to={'/admin-panel'} style={{fontWeight:600}}>AdminPanel</Link>
      </Flex>
    )
}