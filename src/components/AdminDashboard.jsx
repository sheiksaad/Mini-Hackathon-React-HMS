// src/components/Dashboard.js
import React, { useState } from "react";
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
import CustomerManagement from "./Screens/AddCustomer";
import RoomManagement from "./screens/RoomManagement";
import BookingManagement from "./screens/BookingManagement";
import PaymentManagement from "./screens/PaymentManagement";
import StaffManagement from "./Screens/StaffManagement";
import ServiceManagement from "./screens/ServiceManagement";
import InventoryManagement from "./screens/InventoryManagement";
import ReportGeneration from "./screens/ReportGeneration";
import ProfileManagement from "./screens/ProfileManagement";
import AddCustomer from "./Screens/AddCustomer";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const Dashboard = () => {
  const [screen, setScreen] = useState("CustomerManagement");

  const screens = {
    CustomerManagement: <AddCustomer />,
    RoomManagement: <RoomManagement />,
    BookingManagement: <BookingManagement />,
    PaymentManagement: <PaymentManagement />,
    StaffManagement: <StaffManagement />,
    ServiceManagement: <ServiceManagement />,
    InventoryManagement: <InventoryManagement />,
    ReportGeneration: <ReportGeneration />,
    ProfileManagement: <ProfileManagement />,
  };

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
              <ListItemText primary={text.replace(/([A-Z])/g, " $1").trim()} />
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
  );
};

export default Dashboard;
