import { Outlet } from "react-router-dom";

import Navbar from "../components/common/Navbar";

const UserLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default UserLayout;