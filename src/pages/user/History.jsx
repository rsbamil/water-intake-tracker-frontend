import { useCallback, useEffect, useState } from "react";
import {
  CalendarDays,
  Droplets,
  Target,
  TrendingUp,
} from "lucide-react";
import toast from "react-hot-toast";

import intakeService from "../../services/intakeService";

import Card from "../../components/common/Card";
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

const History = () => {
  const [history, setHistory] = useState([]);

  const [loading, setLoading] = useState(true);

  const loadHistory = useCallback(async () => {
    try {
      setLoading(true);

      const response =
        await intakeService.getHistory();

      setHistory(
        response.data.history || []
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to load hydration history."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-72px)] items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-72px)]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Header */}

        <section className="mb-8">
          <p className="mb-2 text-sm font-medium text-sky-500">
            Your hydration journey
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Hydration history
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
            Look back at your daily water intake and
            see how consistently you're staying hydrated.
          </p>
        </section>

        {/* Empty state */}

        {history.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-50">
              <Droplets className="h-7 w-7 text-sky-500" />
            </div>

            <h2 className="mt-5 text-lg font-bold text-slate-900">
              No history yet
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">
              Start logging your water intake and
              your daily hydration history will appear
              here.
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {history.map((day) => {
              const total = day.totalIntake || 0;

              /*
               * History API returns totals but not the
               * historical goal for each individual day.
               *
               * The current goal is therefore not used
               * to calculate historical completion.
               */

              return (
                <Card
                  key={day.date}
                  className="overflow-hidden"
                >
                  <div className="p-5 sm:p-6">

                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                      {/* Date */}

                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50">
                          <CalendarDays className="h-5 w-5 text-sky-500" />
                        </div>

                        <div>
                          <h2 className="font-bold text-slate-900">
                            {formatDate(day.date)}
                          </h2>

                          <p className="mt-1 text-xs text-slate-400">
                            {day.entries}{" "}
                            {day.entries === 1
                              ? "entry"
                              : "entries"}
                          </p>
                        </div>
                      </div>

                      {/* Total */}

                      <div className="sm:text-right">
                        <div className="flex items-baseline gap-2 sm:justify-end">
                          <span className="text-2xl font-bold text-slate-900">
                            {total}
                          </span>

                          <span className="text-sm font-medium text-slate-400">
                            ml
                          </span>
                        </div>

                        <p className="mt-1 text-xs text-slate-400">
                          total water intake
                        </p>
                      </div>
                    </div>

                    {/* Visual bar */}

                    <div className="mt-6">
                      <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-sky-500 transition-all duration-700"
                          style={{
                            width: `${Math.min(
                              (total / 3000) * 100,
                              100
                            )}%`,
                          }}
                        />
                      </div>

                      <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                        <span>
                          {(
                            total / 1000
                          ).toFixed(2)}{" "}
                          L
                        </span>

                        <span>
                          {day.entries} logged
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* Information */}

        {history.length > 0 && (
          <div className="mt-6 grid gap-4 sm:grid-cols-3">

            <Card className="p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-sky-50 p-3">
                  <Droplets className="h-5 w-5 text-sky-500" />
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Days tracked
                  </p>

                  <p className="text-xl font-bold text-slate-900">
                    {history.length}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-emerald-50 p-3">
                  <TrendingUp className="h-5 w-5 text-emerald-500" />
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Total consumed
                  </p>

                  <p className="text-xl font-bold text-slate-900">
                    {(
                      history.reduce(
                        (sum, day) =>
                          sum +
                          day.totalIntake,
                        0
                      ) / 1000
                    ).toFixed(1)}
                    L
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-violet-50 p-3">
                  <Target className="h-5 w-5 text-violet-500" />
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Average per day
                  </p>

                  <p className="text-xl font-bold text-slate-900">
                    {(
                      history.reduce(
                        (sum, day) =>
                          sum +
                          day.totalIntake,
                        0
                      ) /
                      history.length /
                      1000
                    ).toFixed(2)}
                    L
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

export default History;