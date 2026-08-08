import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Droplets,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  UserRound,
  Sparkles,
} from "lucide-react";
import toast from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";

const Register = () => {
  const navigate = useNavigate();

  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name =
        "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email
      )
    ) {
      newErrors.email =
        "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword =
        "Please confirm your password";
    } else if (
      formData.password !==
      formData.confirmPassword
    ) {
      newErrors.confirmPassword =
        "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      setLoading(true);

      await register({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });

      toast.success(
        "Account created successfully!"
      );

      navigate("/dashboard");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Unable to create account.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-sky-500/20 blur-3xl" />

      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center px-6 py-10">
        <div className="grid w-full gap-12 lg:grid-cols-2 lg:items-center">

          {/* Branding */}

          <div className="hidden lg:block">
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 backdrop-blur">
              <Sparkles className="h-4 w-4 text-sky-400" />
              Start your hydration journey
            </div>

            <h1 className="max-w-xl text-5xl font-bold leading-tight tracking-tight text-white">
              Small habits.
              <span className="block text-sky-400">
                Better days.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-400">
              Create your account and turn hydration
              into a simple daily habit.
            </p>

            <div className="mt-10 flex items-center gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <Droplets className="h-6 w-6 text-sky-400" />
              </div>

              <div>
                <p className="font-semibold text-white">
                  Your hydration, your goal
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  Set a daily target and track your
                  progress.
                </p>
              </div>
            </div>
          </div>

          {/* Register */}

          <div className="mx-auto w-full max-w-md">
            <div className="rounded-3xl border border-white/10 bg-white p-8 shadow-2xl shadow-black/30 sm:p-10">

              <div className="mb-8">
                <div className="mb-5 inline-flex rounded-2xl bg-sky-50 p-3">
                  <Droplets className="h-7 w-7 text-sky-500" />
                </div>

                <h2 className="text-2xl font-bold text-slate-900">
                  Create your account
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Start tracking your hydration today.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div className="relative">
                  <UserRound className="pointer-events-none absolute left-4 top-[38px] h-4 w-4 text-slate-400" />

                  <Input
                    id="name"
                    name="name"
                    label="Full name"
                    placeholder="Rohit Kumar"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    className="pl-11"
                    autoComplete="name"
                  />
                </div>

                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-[38px] h-4 w-4 text-slate-400" />

                  <Input
                    id="email"
                    name="email"
                    type="email"
                    label="Email address"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    className="pl-11"
                    autoComplete="email"
                  />
                </div>

                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute left-4 top-[38px] h-4 w-4 text-slate-400" />

                  <Input
                    id="password"
                    name="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    label="Password"
                    placeholder="At least 6 characters"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                    className="pl-11 pr-11"
                    autoComplete="new-password"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (previous) => !previous
                      )
                    }
                    className="absolute right-3 top-[34px] rounded-lg p-2 text-slate-400 hover:bg-slate-100"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>

                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute left-4 top-[38px] h-4 w-4 text-slate-400" />

                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    label="Confirm password"
                    placeholder="Repeat your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                    className="pl-11 pr-11"
                    autoComplete="new-password"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        (previous) => !previous
                      )
                    }
                    className="absolute right-3 top-[34px] rounded-lg p-2 text-slate-400 hover:bg-slate-100"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>

                <Button
                  type="submit"
                  loading={loading}
                  className="mt-2 w-full py-3"
                >
                  Create account
                </Button>
              </form>

              <p className="mt-7 text-center text-sm text-slate-500">
                Already have an account?

                <Link
                  to="/login"
                  className="ml-1 font-semibold text-sky-500 hover:text-sky-600"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;