import {
    LayoutDashboard,
    LogOut,
    Users,
  } from "lucide-react";
  import {
    NavLink,
    useNavigate,
  } from "react-router-dom";
  import toast from "react-hot-toast";
  
  import { useAuth } from "../../context/AuthContext";
  
  const AdminSidebar = () => {
    const { logout } = useAuth();
  
    const navigate = useNavigate();
  
    const handleLogout = () => {
      logout();
  
      toast.success("Logged out successfully");
  
      navigate("/login");
    };
  
    const navItems = [
      {
        label: "Dashboard",
        path: "/admin",
        icon: LayoutDashboard,
      },
      {
        label: "Users",
        path: "/admin/users",
        icon: Users,
      },
    ];
  
    return (
      <aside className="fixed bottom-0 left-0 top-16 hidden w-64 border-r border-slate-200 bg-white lg:block">
        <div className="flex h-full flex-col p-4">
  
          <div className="mb-4 px-3 pt-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Management
            </p>
          </div>
  
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
  
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/admin"}
                  className={({ isActive }) =>
                    `
                    flex items-center gap-3
                    rounded-xl px-4 py-3
                    text-sm font-semibold
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
  
          <div className="mt-auto border-t border-slate-100 pt-4">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
  
              Logout
            </button>
          </div>
        </div>
      </aside>
    );
  }
  
  export default AdminSidebar;