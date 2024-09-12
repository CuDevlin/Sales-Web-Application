import {useEffect, useState} from "react";
import { Box } from "@mui/material";

const Order = () =>
{
    const [chartData, setChartData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/total/orders');
                const data = await response.json();
                setChartData(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Box display="flex" justifyContent="center" sx={{paddingRight: '15%'}}>
            <h2>{chartData}</h2>
        </Box>
    )

}
export default Order