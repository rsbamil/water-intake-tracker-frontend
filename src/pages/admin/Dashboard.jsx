import {
    ShieldCheck,
    Users,
  } from "lucide-react";
  
  import { useAuth } from "../../context/AuthContext";
  
  const AdminDashboard = () => {
    const { user } = useAuth();
  
    return (
      <div className="min-h-screen bg-slate-50 p-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl bg-slate-900 p-8 text-white">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/10">
              <ShieldCheck className="h-6 w-6 text-sky-400" />
            </div>
  
            <p className="text-sm text-slate-400">
              Administrator
            </p>
  
            <h1 className="mt-1 text-3xl font-bold">
              Welcome, {user?.name}
            </h1>
  
            <div className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white/5 px-4 py-3">
              <Users className="h-4 w-4 text-sky-400" />
  
              <span className="text-sm text-slate-300">
                User management
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default AdminDashboard;