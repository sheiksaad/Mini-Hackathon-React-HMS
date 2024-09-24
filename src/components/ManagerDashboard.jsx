import React, { useState } from "react";
import StaffManagement from "./Screens/StaffManagement";
import ReportGeneration from "./screens/ReportGeneration";
import {
  Drawer,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  CssBaseline,
  Typography,
  Box,
} from "@mui/material";
import ProfileManagement from "./screens/ProfileManagement";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

const ManagerDashboard = () => {
  const [screen, setScreen] = useState("StaffManagement");

  const screens = {
    StaffManagement: <StaffManagement />,
    ReportGeneration: <ReportGeneration />,
    ProfileManagement: <ProfileManagement />,
  };
  const drawerWidth = 240;

  const navigate = useNavigate();

  const Logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user_Uid");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Hotel Management System
            </Typography>
          </Toolbar>
          <button
            onClick={Logout}
            className={`absolute right-0 top-8  w-auto px-1 py-1 rounded-md shadow-lg `}
          >
            Logout
          </button>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />
          <List>
            {Object.keys(screens).map((text) => (
              <ListItem button key={text} onClick={() => setScreen(text)}>
                <ListItemText
                  primary={text.replace(/([A-Z])/g, " $1").trim()}
                />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <Toolbar />
          {screens[screen]}
        </Box>
      </Box>
    </>
  );
};

export default ManagerDashboard;
