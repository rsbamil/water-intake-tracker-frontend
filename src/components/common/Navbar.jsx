import { useState } from "react";
import {
  Droplets,
  History,
  LayoutDashboard,
  LogOut,
  Menu,
  UserRound,
  X,
} from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const handleLogout = () => {
    logout();

    toast.success("Logged out successfully");

    navigate("/login");
  };

  const navItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "History",
      path: "/history",
      icon: History,
    },
    {
        label:"Profile",
        path:"/profile",
        icon:UserRound,
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}

        <Link
          to="/dashboard"
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500 shadow-lg shadow-sky-500/20">
            <Droplets className="h-5 w-5 text-white" />
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-bold text-slate-900">
              AquaTrack
            </p>

            <p className="text-[11px] text-slate-400">
              Hydration companion
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `
                  flex items-center gap-2
                  rounded-xl px-4 py-2.5
                  text-sm font-medium
                  transition
                  ${
                    isActive
                      ? "bg-sky-50 text-sky-600"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  }
                  `
                }
              >
                <Icon className="h-4 w-4" />

                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* User */}

        <div className="hidden items-center gap-3 md:flex">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>

          <div className="hidden lg:block">
            <p className="text-sm font-semibold text-slate-800">
              {user?.name}
            </p>

            <p className="text-xs text-slate-400">
              {user?.email}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="ml-2 rounded-xl p-2.5 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
            title="Logout"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>

        {/* Mobile menu */}

        <button
          onClick={() =>
            setMobileOpen(
              (previous) => !previous
            )
          }
          className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 md:hidden"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile navigation */}

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className={({ isActive }) =>
                    `
                    flex items-center gap-3
                    rounded-xl px-4 py-3
                    text-sm font-medium
                    ${
                      isActive
                        ? "bg-sky-50 text-sky-600"
                        : "text-slate-600 hover:bg-slate-50"
                    }
                    `
                  }
                >
                  <Icon className="h-4 w-4" />

                  {item.label}
                </NavLink>
              );
            })}
          </div>

          <div className="mt-4 border-t border-slate-100 pt-4">
            <div className="flex items-center gap-3 px-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                {user?.name?.charAt(0)?.toUpperCase()}
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-800">
                  {user?.name}
                </p>

                <p className="text-xs text-slate-400">
                  {user?.email}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="mt-3 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />

              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;