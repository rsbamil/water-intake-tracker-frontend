import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/common/LoadingSpinner";

import AdminLayout from "../layouts/AdminLayout";

import AdminDashboard from "../pages/admin/Dashboard";
import UserDetails from "../pages/admin/UserDetails";
import AdminUsers from "../pages/admin/Users"

const AdminRoute = () => {
  const {
    user,
    loading,
    isAuthenticated,
  } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (user?.role !== "admin") {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }
  return <Outlet />;
}

export default AdminRoute;