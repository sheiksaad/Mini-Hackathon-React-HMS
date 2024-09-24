import { React } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Form/Login";
import SignUp from "./components/Form/SignUp";
import AdminDashboard from "./components/AdminDashboard";
import FormRouter from "./components/Router/FormRouter";
import ManagerDashboard from "./components/ManagerDashboard";
import StaffDashboard from "./components/StaffDashboard";
import CoustomerDashboard from "./components/CoustomerDashboard";
import Home from "./components/Home";
import ProtectedRoute from "./components/Router/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route element={<FormRouter />}>
          <Route path="/" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="home" element={<Home />} />
          <Route path="adminDashdoard" element={<AdminDashboard />} />
          <Route path="managerDashdoard" element={<ManagerDashboard />} />
          <Route path="staffDashdoard" element={<StaffDashboard />} />
          <Route path="customerDashdoard" element={<CoustomerDashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
