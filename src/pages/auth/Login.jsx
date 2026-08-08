import {
    Droplets,
    ShieldCheck,
    Sparkles,
  } from "lucide-react";
  
  const Login=()=> {
    return (
      <div className="relative flex min-h-screen overflow-hidden bg-slate-950">
        {/* Background decoration */}
  
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-sky-500/20 blur-3xl" />
  
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />
  
        <div className="relative mx-auto flex w-full max-w-7xl items-center px-6 py-12">
          <div className="grid w-full gap-12 lg:grid-cols-2 lg:items-center">
  
            {/* Left side */}
  
            <div className="hidden lg:block">
              <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 backdrop-blur">
                <Sparkles className="h-4 w-4 text-sky-400" />
                Smart hydration tracking
              </div>
  
              <h1 className="max-w-xl text-5xl font-bold leading-tight tracking-tight text-white">
                Stay hydrated.
                <span className="block text-sky-400">
                  Feel your best.
                </span>
              </h1>
  
              <p className="mt-6 max-w-lg text-lg leading-8 text-slate-400">
                Track your daily water intake, build healthy
                hydration habits, and stay on top of your
                personal hydration goal.
              </p>
  
              <div className="mt-10 flex gap-4">
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <div className="rounded-xl bg-sky-500/10 p-3">
                    <Droplets className="h-5 w-5 text-sky-400" />
                  </div>
  
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Track intake
                    </p>
  
                    <p className="text-xs text-slate-400">
                      Every glass counts
                    </p>
                  </div>
                </div>
  
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <div className="rounded-xl bg-emerald-500/10 p-3">
                    <ShieldCheck className="h-5 w-5 text-emerald-400" />
                  </div>
  
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Secure
                    </p>
  
                    <p className="text-xs text-slate-400">
                      Private account
                    </p>
                  </div>
                </div>
              </div>
            </div>
  
            {/* Login card */}
  
            <div className="mx-auto w-full max-w-md">
              <div className="rounded-3xl border border-white/10 bg-white p-8 shadow-2xl shadow-black/20">
                <div className="mb-8">
                  <div className="mb-5 inline-flex rounded-2xl bg-sky-50 p-3">
                    <Droplets className="h-7 w-7 text-sky-500" />
                  </div>
  
                  <h2 className="text-2xl font-bold text-slate-900">
                    Welcome back
                  </h2>
  
                  <p className="mt-2 text-sm text-slate-500">
                    Sign in to continue tracking your hydration.
                  </p>
                </div>
  
                <div className="space-y-4">
                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-500"
                  />
  
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-500"
                  />
  
                  <button className="w-full rounded-xl bg-sky-500 py-3 font-semibold text-white transition hover:bg-sky-600">
                    Sign in
                  </button>
                </div>
  
                <p className="mt-6 text-center text-sm text-slate-500">
                  Don't have an account?
                  <span className="ml-1 font-semibold text-sky-500">
                    Create one
                  </span>
                </p>
              </div>
            </div>
  
          </div>
        </div>
      </div>
    );
  }
  
  export default Login;