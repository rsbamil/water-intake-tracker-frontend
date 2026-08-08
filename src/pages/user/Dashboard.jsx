import { Droplets } from "lucide-react";

import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-3xl bg-slate-900 p-8 text-white">
          <Droplets className="mb-4 h-8 w-8 text-sky-400" />

          <p className="text-sm text-slate-400">
            Welcome back
          </p>

          <h1 className="mt-1 text-3xl font-bold">
            {user?.name}
          </h1>

          <p className="mt-3 text-slate-400">
            Your hydration dashboard is coming together.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;