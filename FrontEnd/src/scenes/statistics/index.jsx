import React, { useState } from "react";
import Box from "@mui/material/Box";
import MonthlyRevenue from "../../components/MonthlyRevenue";
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const StatData = () => {
    let today = new Date(Date.now());

    let lastMonth = (today.getFullYear() + "-" + today.getMonth())

    const [monthOffset, setMonthOffset] = useState(lastMonth)

    const handleMonthChange = (offset) => {
        const currentMonth = new Date(monthOffset + '-01');
        const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1);
        setMonthOffset(`${newMonth.getFullYear()}-${(newMonth.getMonth() + 1).toString().padStart(2, '0')}`);
    };

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
                <h2>Statistics</h2>
                <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '1rem' }}>
                    <IconButton onClick={() => handleMonthChange(-1)}>
                        <ArrowBackIcon />
                    </IconButton>
                    <span>{monthOffset}</span>
                    <IconButton onClick={() => handleMonthChange(1)}>
                        <ArrowForwardIcon />
                    </IconButton>
                </div>
            </Box>
            <Box display="flex" justifyContent="space-around" sx={{ padding: '10px' }}>
                <Box
                    width="20%"
                    padding="10px"
                    border="1px solid #ddd"
                    borderRadius="5px"
                >
                    <h4 style={{ paddingLeft: "30px" }}>Monthly Revenue: </h4>
                    <MonthlyRevenue fromDate={monthOffset} />
                </Box>
            </Box>
        </Box>
    );
};

export default StatData;
