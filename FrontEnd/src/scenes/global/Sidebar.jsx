import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton } from '@mui/material';
import { Link } from "react-router-dom";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import TableChartIcon from '@mui/icons-material/TableChart';
import BarChartIcon from '@mui/icons-material/BarChart';



const Item = ({ title, to, icon, selected, setSelected }) => {

    return (
        <MenuItem
            active={selected === title}
            onClick={() => setSelected(title)}
            icon={icon}
        >
            <Link to={to} style={{ textDecoration: "none" }}>
                <h5>{title}</h5>
            </Link>
        </MenuItem>
    )
}

const AppSidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard")

    return (
        <Box>
            <Sidebar collapsed={isCollapsed} style={{ height: "100%", overflow: "hidden" }}>
                <Menu iconShape="square">
                    {/* Logo and menu icon */}
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                        style={{
                            margin: "10px 0 20px 0"
                        }}
                    >
                        {!isCollapsed && (
                            <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                                <h3>Menu</h3>
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlinedIcon />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    {/* Menu items for charts */}
                    <Box paddingLeft={isCollapsed ? undefined : "0%"}
                    >
                        <Item
                            title="Dashboard"
                            to="/"
                            icon={<HomeOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </Box>

                    <Box paddingLeft={isCollapsed ? undefined : "0%"}>
                        <Item
                            title="Data"
                            to="/data"
                            icon={<TableChartIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </Box>
                    <Box paddingLeft={isCollapsed ? undefined : "0%"}>
                        <Item
                            title="Chart"
                            to="/chart"
                            icon={<BarChartIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </Box>
                    <Box paddingLeft={isCollapsed ? undefined : "0%"}>
                        <Item
                            title="Statistics"
                            to="/statistic"
                            icon={< TableChartIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </Box>
                </Menu>
            </Sidebar>
        </Box>
    );
};

export default AppSidebar;