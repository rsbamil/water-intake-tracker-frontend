import { use, useEffect, useState } from "react";
import {
  AlertTriangle,
  Droplets,
  Mail,
  Save,
  ShieldCheck,
  Target,
  UserRound,
} from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import userService from "../../services/userService";

import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const Profile = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const [dailyGoal, setDailyGoal] = useState(user?.dailyGoal || 2000);

  const [loading, setLoading] = useState(false);

  const [loadingProfile, setLoadingProfile] = useState(true);

  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await userService.getMyProfile();

        setDailyGoal(response.data.user.dailyGoal || 2000);
      } catch (error) {
        toast.error(error.response?.data?.message || "Unable to load profile.");
      } finally {
        setLoadingProfile(false);
      }
    };

    loadProfile();
  }, []);

  const handleGoalUpdate = async (event) => {
    event.preventDefault();

    const goal = Number(dailyGoal);

    if (!goal || goal <= 0) {
      toast.error("Daily goal must be greater than 0.");

      return;
    }

    if (goal > 10000) {
      toast.error("Daily goal cannot exceed 10000 ml.");

      return;
    }

    try {
      setLoading(true);

      const response = await userService.updateMyGoal(goal);

      setDailyGoal(response.data.dailyGoal);

      toast.success("Daily hydration goal updated.");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to update your goal."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This will permanently remove your account and water intake history."
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);

      await userService.deleteMyAccount();

      logout();

      toast.success("Your account has been deleted.");

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to delete your account."
      );
    } finally {
      setDeleting(false);
    }
  };

  if (loadingProfile) {
    return (
      <div className="flex min-h-[calc(100vh-72px)] items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-72px)]">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}

        <section className="mb-8">
          <p className="mb-2 text-sm font-medium text-sky-500">
            Account settings
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Your profile
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage your account and hydration preferences.
          </p>
        </section>

        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Profile summary */}

          <Card className="h-fit p-6">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-900 text-2xl font-bold text-white shadow-lg">
                {user?.name?.charAt(0)?.toUpperCase()}
              </div>

              <h2 className="mt-5 text-xl font-bold text-slate-900">
                {user?.name}
              </h2>

              <div className="mt-2 flex items-center gap-2 text-sm text-slate-400">
                <Mail className="h-4 w-4" />

                {user?.email}
              </div>

              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600">
                <ShieldCheck className="h-3.5 w-3.5" />

                {user?.role === "admin" ? "Administrator" : "Active account"}
              </div>
            </div>

            <div className="mt-7 border-t border-slate-100 pt-6">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-sky-50 p-3">
                  <UserRound className="h-4 w-4 text-sky-500" />
                </div>

                <div>
                  <p className="text-xs text-slate-400">Account</p>

                  <p className="text-sm font-semibold text-slate-800">
                    Personal hydration profile
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Settings */}

          <div className="space-y-6">
            {/* Goal */}

            <Card className="p-6 sm:p-7">
              <div className="mb-6 flex items-start gap-4">
                <div className="rounded-2xl bg-sky-50 p-3">
                  <Target className="h-5 w-5 text-sky-500" />
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">
                    Daily hydration goal
                  </h2>

                  <p className="mt-1 text-sm leading-5 text-slate-500">
                    Set the amount of water you'd like to drink each day.
                  </p>
                </div>
              </div>

              <form
                onSubmit={handleGoalUpdate}
                className="flex flex-col gap-4 sm:flex-row sm:items-end"
              >
                <div className="flex-1">
                  <Input
                    id="dailyGoal"
                    label="Daily goal"
                    type="number"
                    min="1"
                    max="10000"
                    value={dailyGoal}
                    onChange={(event) => setDailyGoal(event.target.value)}
                    placeholder="2000"
                  />
                </div>

                <div className="sm:pb-0">
                  <Button
                    type="submit"
                    loading={loading}
                    className="w-full sm:w-auto"
                  >
                    <Save className="h-4 w-4" />
                    Save goal
                  </Button>
                </div>
              </form>

              <div className="mt-5 flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3 text-xs text-slate-500">
                <Droplets className="h-4 w-4 text-sky-500" />
                Your goal is measured in millilitres.
              </div>
            </Card>

            {/* Account danger zone */}

            <Card className="border-red-100 p-6 sm:p-7">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-red-50 p-3">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                </div>

                <div className="flex-1">
                  <h2 className="font-bold text-slate-900">Delete account</h2>

                  <p className="mt-1 text-sm leading-5 text-slate-500">
                    Permanently delete your account and all of your recorded
                    water intake.
                  </p>

                  {user?.role !== "admin" && (
                    <Button
                      variant="danger"
                      loading={deleting}
                      onClick={handleDeleteAccount}
                      className="mt-5"
                    >
                      Delete my account
                    </Button>
                  )}
                  {user?.role === "admin" && (
                    <div className="mt-5 rounded-xl bg-amber-50 px-4 py-3 text-xs font-medium text-amber-700">
                      Administrator accounts cannot be deleted from the
                      application.
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
