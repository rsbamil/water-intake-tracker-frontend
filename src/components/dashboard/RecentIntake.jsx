import {
    Clock3,
    Droplets,
    Trash2,
  } from "lucide-react";
  
  function formatTime(date) {
    return new Date(date).toLocaleTimeString(
      [],
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  }
  
  const RecentIntake = ({
    entries = [],
    onDelete,
    deletingId,
  }) => {
    return (
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-slate-900">
              Recent intake
            </h2>
  
            <p className="mt-1 text-xs text-slate-400">
              Your water entries for today
            </p>
          </div>
  
          <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
            {entries.length} entries
          </div>
        </div>
  
        {entries.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
            <Droplets className="mx-auto h-8 w-8 text-slate-300" />
  
            <p className="mt-3 text-sm font-medium text-slate-500">
              No water logged today
            </p>
  
            <p className="mt-1 text-xs text-slate-400">
              Add your first glass above.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {entries.map((entry) => (
              <div
                key={entry._id || entry.id}
                className="group flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-4 transition hover:border-sky-100 hover:bg-sky-50/40"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50">
                    <Droplets className="h-4 w-4 text-sky-500" />
                  </div>
  
                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      {entry.amount} ml
                    </p>
  
                    <div className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                      <Clock3 className="h-3 w-3" />
  
                      {formatTime(
                        entry.consumedAt
                      )}
                    </div>
                  </div>
                </div>
  
                <button
                  disabled={
                    deletingId ===
                    (entry._id || entry.id)
                  }
                  onClick={() =>
                    onDelete(
                      entry._id || entry.id
                    )
                  }
                  className="rounded-xl p-2.5 text-slate-300 opacity-0 transition hover:bg-red-50 hover:text-red-500 group-hover:opacity-100 disabled:opacity-50"
                  title="Delete intake"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
  
  export default RecentIntake;