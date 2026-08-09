import { useCallback, useEffect, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Droplets,
  Mail,
  Save,
  ShieldCheck,
  Target,
  UserRound,
} from "lucide-react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import toast from "react-hot-toast";

import userService from "../../services/userService";

import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import LoadingSpinner from "../../components/common/LoadingSpinner";

function formatDate(dateString) {
  return new Date(
    `${dateString}T00:00:00`
  ).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const UserDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [user, setUser] =
    useState(null);

  const [history, setHistory] =
    useState([]);

  const [dailyGoal, setDailyGoal] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

    const loadUser = useCallback(
        async () => {
          try {
            setLoading(true);
      
            const response =
              await userService.getUserIntakeHistory(id);
      
            const data = response.data;
      
            if (!data?.user) {
              toast.error("User not found.");
      
              navigate("/admin/users");
      
              return;
            }
      
            setUser({
              _id: data.user.id,
              name: data.user.name,
              email: data.user.email,
              dailyGoal: data.user.dailyGoal || 2000,
            });
      
            setDailyGoal(
              data.user.dailyGoal || 2000
            );
      
            setHistory(
              data.history || []
            );
          } catch (error) {
            toast.error(
              error.response?.data?.message ||
                "Unable to load user details."
            );
          } finally {
            setLoading(false);
          }
        },
        [id, navigate]
      );

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const handleGoalUpdate = async (
    event
  ) => {
    event.preventDefault();

    const goal = Number(dailyGoal);

    if (!goal || goal <= 0) {
      toast.error(
        "Daily goal must be greater than 0."
      );

      return;
    }

    if (goal > 10000) {
      toast.error(
        "Daily goal cannot exceed 10000 ml."
      );

      return;
    }

    try {
      setSaving(true);

      await userService.updateUserGoal(
        id,
        goal
      );

      setUser((previous) => ({
        ...previous,
        dailyGoal: goal,
      }));

      toast.success(
        "User's daily goal updated."
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to update the user's goal."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-[calc(100vh-64px)]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Back */}

        <Link
          to="/admin/users"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-sky-600"
        >
          <ArrowLeft className="h-4 w-4" />

          Back to users
        </Link>

        {/* User header */}

        <Card className="overflow-hidden">
          <div className="relative p-6 sm:p-8">

            <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-sky-100 blur-3xl" />

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">

              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-slate-900 text-2xl font-bold text-white">
                {user.name
                  ?.charAt(0)
                  ?.toUpperCase()}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-bold text-slate-900">
                    {user.name}
                  </h1>

                  {user.role === "admin" && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2.5 py-1 text-xs font-bold text-violet-600">
                      <ShieldCheck className="h-3.5 w-3.5" />

                      Administrator
                    </span>
                  )}
                </div>

                <div className="mt-2 flex items-center gap-2 text-sm text-slate-400">
                  <Mail className="h-4 w-4" />

                  {user.email}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Content */}

        <div className="mt-6 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">

          {/* Goal */}

          <Card className="h-fit p-6">
            <div className="mb-6 flex items-start gap-4">
              <div className="rounded-2xl bg-sky-50 p-3">
                <Target className="h-5 w-5 text-sky-500" />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Daily hydration goal
                </h2>

                <p className="mt-1 text-sm leading-5 text-slate-500">
                  Update the recommended daily intake
                  for this user.
                </p>
              </div>
            </div>

            <form
              onSubmit={handleGoalUpdate}
              className="space-y-4"
            >
              <Input
                id="userDailyGoal"
                label="Daily goal in millilitres"
                type="number"
                min="1"
                max="10000"
                value={dailyGoal}
                onChange={(event) =>
                  setDailyGoal(
                    event.target.value
                  )
                }
              />

              <Button
                type="submit"
                loading={saving}
                className="w-full"
              >
                <Save className="h-4 w-4" />

                Update goal
              </Button>
            </form>
          </Card>

          {/* History */}

          <Card className="p-6">
            <div className="mb-6 flex items-start gap-4">
              <div className="rounded-2xl bg-emerald-50 p-3">
                <Droplets className="h-5 w-5 text-emerald-500" />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Water intake history
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Daily intake totals for this user.
                </p>
              </div>
            </div>

            {history.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
                <Droplets className="mx-auto h-7 w-7 text-slate-300" />

                <p className="mt-3 text-sm font-semibold text-slate-500">
                  No intake history
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  This user hasn't logged any water yet.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {history.map((day) => {
                  const total =
                    day.totalIntake || 0;

                  return (
                    <div
                      key={day.date}
                      className="rounded-2xl border border-slate-100 p-4 transition hover:border-sky-100 hover:bg-sky-50/30"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="rounded-xl bg-slate-50 p-2.5">
                            <CalendarDays className="h-4 w-4 text-slate-500" />
                          </div>

                          <div>
                            <p className="text-sm font-bold text-slate-800">
                              {formatDate(
                                day.date
                              )}
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                              {day.entries}{" "}
                              {day.entries === 1
                                ? "entry"
                                : "entries"}
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-lg font-bold text-slate-900">
                            {total} ml
                          </p>

                          <p className="text-xs text-slate-400">
                            {(total / 1000).toFixed(
                              2
                            )}{" "}
                            L
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-emerald-500 transition-all duration-700"
                          style={{
                            width: `${Math.min(
                              (total / 3000) *
                                100,
                              100
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        </div>

        {/* Relationship note */}

        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-sky-100 bg-sky-50 p-4">
          <UserRound className="mt-0.5 h-4 w-4 shrink-0 text-sky-500" />

          <p className="text-xs leading-5 text-sky-700">
            This information is restricted to administrators.
            The user's intake records are associated with their
            account through the backend database relationship.
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;