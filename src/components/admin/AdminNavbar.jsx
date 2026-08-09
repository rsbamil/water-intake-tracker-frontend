import { useState } from "react";
import {
  Droplets,
  LogOut,
  Menu,
  ShieldCheck,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";

const AdminNavbar = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const handleLogout = () => {
    logout();

    toast.success("Logged out successfully");

    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">

        {/* Left */}

        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              setMobileOpen(
                (previous) => !previous
              )
            }
            className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 shadow-lg">
            <Droplets className="h-5 w-5 text-sky-400" />
          </div>

          <div>
            <p className="text-sm font-bold text-slate-900">
              AquaTrack
            </p>

            <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
              Administration
            </p>
          </div>
        </div>

        {/* Admin */}

        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-slate-800">
              {user?.name}
            </p>

            <div className="flex items-center justify-end gap-1 text-xs text-slate-400">
              <ShieldCheck className="h-3 w-3 text-sky-500" />

              Administrator
            </div>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-sm font-bold text-sky-700">
            {user?.name
              ?.charAt(0)
              ?.toUpperCase()}
          </div>

          <button
            onClick={handleLogout}
            title="Logout"
            className="rounded-xl p-2.5 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Mobile sidebar */}

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white p-4 lg:hidden">
          <div className="space-y-2">
            <button
              onClick={() => {
                navigate("/admin/users");
                setMobileOpen(false);
              }}
              className="w-full rounded-xl bg-sky-50 px-4 py-3 text-left text-sm font-semibold text-sky-600"
            >
              User Management
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default AdminNavbar;