import {Box} from "@mui/material";

const TopBar = () => {

    return (
        <Box display="flex" alignItems={"center"} padding={1}  style={{ backgroundColor: 'lightBlue' }}>
            <h2 style={{paddingLeft:"10px"}}>Sales Web Application</h2>
        </Box>);
}

export default TopBar;