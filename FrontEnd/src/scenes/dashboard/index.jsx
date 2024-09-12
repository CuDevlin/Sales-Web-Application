import React from "react";
import {Box} from "@mui/material";
import Order from "../../components/Order";
import Customer from "../../components/Customer";
import Revenue from "../../components/Revenue";


const Dashboard = () => {
    return (
        <Box m="20px">
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                marginBottom="20px"
                padding="10px"
                borderBottom="1px solid #ccc"
            >
                <h2> Dashboard </h2>
                <h4> Total sale's data </h4>

            </Box>

            <Box display="flex" justifyContent="space-evenly" marginBottom="20px">
                <Box
                    width="25%"
                    padding="5px"
                    border="1px solid #ddd"
                    borderRadius="5px"
                >
                    <h4 style={{paddingLeft: "30px"}}>Number of orders:</h4>
                    <Order/>


                </Box>
                <Box
                    width="25%"
                    padding="5px"
                    border="1px solid #ddd"
                    borderRadius="5px"
                >
                    <h4 style={{paddingLeft: "30px"}}>Number of customers:</h4>
                    <Customer/>
                </Box>
                <Box
                    width="25%"
                    padding="5px"
                    border="1px solid #ddd"
                    borderRadius="5px"
                >
                    <h4 style={{paddingLeft: "30px"}}>Revenue:</h4>
                    <Revenue/>
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;
