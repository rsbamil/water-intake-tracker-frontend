import {
    ArrowRight,
    Droplets,
    ShieldCheck,
    Users,
  } from "lucide-react";
  import { Link } from "react-router-dom";
  
  import Card from "../../components/common/Card";
  
  const AdminDashboard = () => {
    return (
      <div className="min-h-[calc(100vh-64px)]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
  
          {/* Header */}
  
          <section className="mb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-600">
              <ShieldCheck className="h-3.5 w-3.5" />
  
              Administrator workspace
            </div>
  
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Welcome to AquaTrack Admin
            </h1>
  
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Manage registered users, review their hydration
              activity, update daily goals, and maintain user
              accounts.
            </p>
          </section>
  
          {/* Main management card */}
  
          <Card className="overflow-hidden">
            <div className="relative p-6 sm:p-8">
  
              <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-sky-100 blur-3xl" />
  
              <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
  
                <div className="flex items-start gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-sky-50">
                    <Users className="h-6 w-6 text-sky-500" />
                  </div>
  
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      User management
                    </h2>
  
                    <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                      View registered users, inspect individual
                      intake history, update hydration goals,
                      or remove user accounts.
                    </p>
                  </div>
                </div>
  
                <Link
                  to="/admin/users"
                  className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-slate-800"
                >
                  Manage users
  
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </Card>
  
          {/* Feature cards */}
  
          <div className="mt-6 grid gap-4 md:grid-cols-3">
  
            <Card className="p-5">
              <div className="rounded-xl bg-sky-50 p-3 w-fit">
                <Users className="h-5 w-5 text-sky-500" />
              </div>
  
              <h3 className="mt-4 font-bold text-slate-900">
                Manage users
              </h3>
  
              <p className="mt-1 text-sm leading-5 text-slate-500">
                Browse and manage registered user accounts.
              </p>
            </Card>
  
            <Card className="p-5">
              <div className="rounded-xl bg-emerald-50 p-3 w-fit">
                <Droplets className="h-5 w-5 text-emerald-500" />
              </div>
  
              <h3 className="mt-4 font-bold text-slate-900">
                View intake
              </h3>
  
              <p className="mt-1 text-sm leading-5 text-slate-500">
                Review a user's historical water intake.
              </p>
            </Card>
  
            <Card className="p-5">
              <div className="rounded-xl bg-violet-50 p-3 w-fit">
                <ShieldCheck className="h-5 w-5 text-violet-500" />
              </div>
  
              <h3 className="mt-4 font-bold text-slate-900">
                Account control
              </h3>
  
              <p className="mt-1 text-sm leading-5 text-slate-500">
                Update goals or remove accounts when necessary.
              </p>
            </Card>
          </div>
        </div>
      </div>
    );
  }
  
  export default AdminDashboard;