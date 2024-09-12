import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";

const MonthlyRevenue = ({ fromDate }) => {
    const [chartData, setChartData] = useState({ totalrevenue: 0 });
    console.log(fromDate);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/total/revenue/${fromDate}`);
                const data = await response.json();
                setChartData(data);
            } catch (error) {
                console.error('Error fetching monthly revenue:', error);
            }
        };

        fetchData();
    }, [fromDate]);

    console.log("Component State:", chartData);

    return (


        <Box display="flex" justifyContent="center" sx={{ paddingRight: '15%' }}>
            <h2>{chartData.totalrevenue} DKK</h2>
        </Box>
    );
};

export default MonthlyRevenue;



