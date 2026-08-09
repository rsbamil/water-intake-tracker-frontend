import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Droplets,
  Mail,
  Search,
  ShieldCheck,
  Trash2,
  UserRound,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import userService from "../../services/userService";

import Card from "../../components/common/Card";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import Button from "../../components/common/Button";

const Users = () => {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [deletingId, setDeletingId] = useState(null);

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);

      const response = await userService.getAllUsers();

      setUsers(response.data.users || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to load users.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const filteredUsers = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return users;
    }

    return users.filter((user) => {
      return (
        user.name?.toLowerCase().includes(value) ||
        user.email?.toLowerCase().includes(value)
      );
    });
  }, [users, search]);

  const handleDelete = async (user) => {
    const userId = user._id || user.id
    const confirmed = window.confirm(
      `Are you sure you want to delete ${user.name}'s account? This will also remove their water intake history.`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(userId);

      await userService.deleteUser(userId);

      setUsers((previous) => previous.filter((item) => item._id !== userId));

      toast.success("User account deleted successfully.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to delete user.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}

        <section className="mb-7">
          <p className="mb-2 text-sm font-medium text-sky-500">
            Administration
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Users
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Browse and manage registered AquaTrack users.
          </p>
        </section>

        {/* Search */}

        <Card className="mb-6 p-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search users by name or email..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-11 text-sm outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-500/10"
            />

            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </Card>

        {/* Results */}

        {loading ? (
          <div className="flex min-h-64 items-center justify-center">
            <LoadingSpinner size="lg" />
          </div>
        ) : filteredUsers.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
              <UserRound className="h-6 w-6 text-slate-400" />
            </div>

            <h2 className="mt-4 font-bold text-slate-900">No users found</h2>

            <p className="mt-1 text-sm text-slate-500">
              {search
                ? "Try a different search term."
                : "There are no registered users yet."}
            </p>
          </Card>
        ) : (
          <div className="space-y-3">
            {filteredUsers.map((user) => {
                const userId = user._id || user.id
              return (
                <Card key={userId} className="overflow-hidden">
                  <div className="p-5 sm:p-6">
                    <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                      {/* User */}

                      <div className="flex min-w-0 items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-sm font-bold text-white">
                          {user.name?.charAt(0)?.toUpperCase()}
                        </div>

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h2 className="truncate font-bold text-slate-900">
                              {user.name}
                            </h2>

                            {user.role === "admin" && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2 py-1 text-[10px] font-bold text-violet-600">
                                <ShieldCheck className="h-3 w-3" />
                                ADMIN
                              </span>
                            )}
                          </div>

                          <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                            <Mail className="h-3 w-3" />

                            <span className="truncate">{user.email}</span>
                          </div>
                        </div>
                      </div>

                      {/* Goal */}

                      <div className="flex items-center gap-3 rounded-xl bg-sky-50 px-4 py-3">
                        <Droplets className="h-4 w-4 text-sky-500" />

                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-wide text-sky-400">
                            Daily goal
                          </p>

                          <p className="text-sm font-bold text-sky-700">
                            {user.dailyGoal || 2000} ml
                          </p>
                        </div>
                      </div>

                      {/* Actions */}

                      <div className="flex flex-wrap items-center gap-2">
                        <Link
                          to={`/admin/users/${userId} `}
                          className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                        >
                          View details
                        </Link>

                        {user.role !== "admin" && (
                          <Button
                            variant="ghost"
                            loading={deletingId === userId}
                            onClick={() => handleDelete(user)}
                            className="border border-red-100 text-red-500 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />

                            <span className="hidden sm:inline">Delete</span>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* Search result info */}

        {!loading && filteredUsers.length > 0 && (
          <p className="mt-5 text-center text-xs text-slate-400">
            Showing {filteredUsers.length}{" "}
            {filteredUsers.length === 1 ? "user" : "users"}
            {search && ` matching "${search}"`}
          </p>
        )}
      </div>
    </div>
  );
};

export default Users;
