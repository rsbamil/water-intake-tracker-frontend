import { useCallback, useEffect, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Droplets,
  Target,
  TrendingUp,
} from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import intakeService from "../../services/intakeService";

import Card from "../../components/common/Card";
import LoadingSpinner from "../../components/common/LoadingSpinner";

import ProgressRing from "../../components/dashboard/ProgressRing";
import QuickAdd from "../../components/dashboard/QuickAdd";
import RecentIntake from "../../components/dashboard/RecentIntake";

const Dashboard = () => {
  const { user } = useAuth();

  const [hydration, setHydration] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [adding, setAdding] =
    useState(false);

  const [deletingId, setDeletingId] =
    useState(null);

  const loadToday = useCallback(
    async () => {
      try {
        setLoading(true);

        const response =
          await intakeService.getTodayIntake();

        setHydration(response.data);
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Unable to load today's hydration data."
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    loadToday();
  }, [loadToday]);

  const handleAddWater = async (
    amount
  ) => {
    try {
      setAdding(true);

      await intakeService.addIntake(
        amount
      );

      await loadToday();

      toast.success(
        `${amount} ml added successfully 💧`
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to log water intake."
      );
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setDeletingId(id);

      await intakeService.deleteIntake(
        id
      );

      await loadToday();

      toast.success(
        "Water entry deleted."
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to delete the entry."
      );
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-72px)] items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const total =
    hydration?.totalIntake || 0;

  const goal =
    hydration?.dailyGoal || 2000;

  const remaining =
    hydration?.remaining || 0;

  const progress =
    hydration?.progress || 0;

  const entries =
    hydration?.entries || [];

  return (
    <div className="min-h-[calc(100vh-72px)]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Welcome */}

        <section className="mb-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-sm font-medium text-sky-500">
                Your hydration dashboard
              </p>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Good to see you,{" "}
                {user?.name?.split(" ")[0]} 👋
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                Keep your hydration on track and
                make every sip count.
              </p>
            </div>

            <Link
              to="/history"
              className="group inline-flex items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-sky-200 hover:text-sky-600 sm:self-auto"
            >
              View history

              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </div>
        </section>

        {/* Main hydration section */}

        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">

          {/* Progress */}

          <Card className="overflow-hidden">
            <div className="relative p-6 sm:p-8">

              <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-sky-100/70 blur-3xl" />

              <div className="relative">
                <div className="mb-7 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50">
                    <Target className="h-5 w-5 text-sky-500" />
                  </div>

                  <div>
                    <p className="font-semibold text-slate-900">
                      Today's goal
                    </p>

                    <p className="text-xs text-slate-400">
                      Keep going, one glass at a time.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center gap-8 sm:flex-row sm:justify-between">

                  <ProgressRing
                    progress={progress}
                    size={210}
                    strokeWidth={14}
                  />

                  <div className="w-full max-w-sm space-y-4">
                    <div>
                      <p className="text-sm text-slate-400">
                        You've consumed
                      </p>

                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="text-4xl font-bold tracking-tight text-slate-900">
                          {total}
                        </span>

                        <span className="font-medium text-slate-400">
                          ml
                        </span>
                      </div>

                      <p className="mt-1 text-sm text-slate-400">
                        of {goal} ml daily goal
                      </p>
                    </div>

                    <div className="h-px bg-slate-100" />

                    <div className="flex items-center gap-3">
                      <div
                        className={`
                          flex h-10 w-10 items-center justify-center rounded-xl
                          ${
                            hydration?.goalReached
                              ? "bg-emerald-50"
                              : "bg-amber-50"
                          }
                        `}
                      >
                        {hydration?.goalReached ? (
                          <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                        ) : (
                          <Droplets className="h-5 w-5 text-amber-500" />
                        )}
                      </div>

                      <div>
                        {hydration?.goalReached ? (
                          <>
                            <p className="text-sm font-bold text-emerald-600">
                              Goal reached! 🎉
                            </p>

                            <p className="text-xs text-slate-400">
                              Great work today.
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="text-sm font-bold text-slate-800">
                              {remaining} ml remaining
                            </p>

                            <p className="text-xs text-slate-400">
                              You're making progress.
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Stats */}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">

            <Card className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">
                    Total today
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {(total / 1000).toFixed(2)}
                    <span className="ml-1 text-base font-medium text-slate-400">
                      L
                    </span>
                  </p>
                </div>

                <div className="rounded-2xl bg-sky-50 p-3">
                  <Droplets className="h-5 w-5 text-sky-500" />
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2 text-xs font-medium text-emerald-600">
                <TrendingUp className="h-4 w-4" />

                {entries.length} intake entries
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">
                    Daily target
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {(goal / 1000).toFixed(1)}
                    <span className="ml-1 text-base font-medium text-slate-400">
                      L
                    </span>
                  </p>
                </div>

                <div className="rounded-2xl bg-violet-50 p-3">
                  <Target className="h-5 w-5 text-violet-500" />
                </div>
              </div>

              <p className="mt-5 text-xs font-medium text-slate-400">
                Your recommended daily water goal
              </p>
            </Card>
          </div>
        </section>

        {/* Quick add */}

        <section className="mt-6">
          <Card className="p-6 sm:p-7">
            <QuickAdd
              onAdd={handleAddWater}
              loading={adding}
            />
          </Card>
        </section>

        {/* Recent intake */}

        <section className="mt-6">
          <Card className="p-6 sm:p-7">
            <RecentIntake
              entries={entries}
              onDelete={handleDelete}
              deletingId={deletingId}
            />
          </Card>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;