import { Flex,  } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Navbar(){

    return(
      <Flex style={{justifyContent:'space-between',  }}>
        <Link to={'/'}>Grassroot</Link>
        <Link to={'/admin-panel'}>AdminPanel</Link>
      </Flex>
    )
}