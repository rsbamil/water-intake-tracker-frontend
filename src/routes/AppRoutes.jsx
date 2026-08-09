import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Dashboard from "../pages/user/Dashboard";
import History from "../pages/user/History";
import Profile from "../pages/user/Profile";

import AdminRoute from "./AdminRoute";
import ProtectedRoute from "./ProtectedRoute";

import AdminDashboard from "../pages/admin/Dashboard";
import AdminUsers from "../pages/admin/Users"
import UserDetails from "../pages/admin/UserDetails";


import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";

import HomeRedirect from "./HomeRedirect";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* For Authenticated Users */}
      <Route element={<ProtectedRoute />}>
        {/* For User Application */}

        <Route element={<UserLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/history" element={<History />} />

          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* For Admin */}

        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />

            <Route path="/admin/users" element={<AdminUsers />} />
          </Route>

          <Route path="/admin/users/:id" element={<UserDetails />} />
        </Route>

      </Route>

      {/* Fallback routes */}
      <Route path="/" element={<HomeRedirect />} />
    </Routes>
  );
};

export default AppRoutes;
