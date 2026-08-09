import { Outlet } from "react-router-dom";

import AdminNavbar from "../components/admin/AdminNavbar";
import AdminSidebar from "../components/admin/AdminSidebar";

const AdminLayout = ()=> {
  return (
    <div className="min-h-screen bg-slate-50">
      <AdminNavbar />

      <div className="flex">
        <AdminSidebar />

        <main className="min-w-0 flex-1 lg:pl-64">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;