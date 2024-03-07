import { Grid, GridItem,  } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"

export default function Navbar(){
    const navigate = useNavigate()
    function handleOnclick(){
        navigate('/admin-panel');
    }
    function handleRevClick(){
        navigate('/');
    }
    return(
        <Grid style={{display:"flex", backgroundColor:'green', justifyContent:'space-between', fontSize:'20px' }}>
            <GridItem m={4} onClick={handleRevClick}>Grassroot</GridItem>
            <GridItem m={4} onClick={handleOnclick}>Admin panel</GridItem>
        </Grid>
    )
}