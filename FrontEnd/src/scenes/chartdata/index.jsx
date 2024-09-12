import Box from "@mui/material/Box";
import BarChart from "../../components/Chart";

const ChartData = () => {

    return (
        <Box sx={{ height: 400, maxWidth: '98%', margin: '16px'}}>
            <h2>Daily Revenue</h2>
            <BarChart/>
        </Box>
    );
};

export default ChartData;
