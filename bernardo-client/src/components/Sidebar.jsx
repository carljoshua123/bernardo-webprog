import { NavLink } from "react-router-dom";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import AssessmentIcon from "@mui/icons-material/Assessment";
import GroupIcon from "@mui/icons-material/Group";

const Sidebar = () => {
  const linkStyle = ({ isActive }) => ({
    backgroundColor: isActive ? "#1f2937" : "transparent",
    color: "white",
    borderRadius: "8px",
  });

  return (
    <Box
      sx={{
        width: 240,
        minHeight: "100vh",
        bgcolor: "#0f172a",
        color: "white",
        p: 2,
      }}
    >
      <List>

        <NavLink to="/dashboard" style={linkStyle}>
          <ListItemButton>
            <ListItemIcon sx={{ color: "white" }}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </NavLink>

        <NavLink to="/dashboard/reports" style={linkStyle}>
          <ListItemButton>
            <ListItemIcon sx={{ color: "white" }}>
              <AssessmentIcon />
            </ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItemButton>
        </NavLink>

        <NavLink to="/dashboard/users" style={linkStyle}>
          <ListItemButton>
            <ListItemIcon sx={{ color: "white" }}>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>
        </NavLink>

      </List>
    </Box>
  );
};

export default Sidebar;