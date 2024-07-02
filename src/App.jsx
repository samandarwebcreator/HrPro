import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import DashboardHome from "./pages/dashboard/Home";
import Orders from "./pages/dashboard/Orders";
import Accepted from "./pages/dashboard/Accepted";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard/home" element={<DashboardHome />} />
      <Route path="/dashboard/applications" element={<Orders />} />
      <Route path="/dashboard/accepted-candidates" element={<Accepted />} />
    </Routes>
  );
}
