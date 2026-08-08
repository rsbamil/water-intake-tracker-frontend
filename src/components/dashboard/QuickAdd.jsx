import {
    GlassWater,
    Plus,
  } from "lucide-react";
  
  const amounts = [
    250,
    500,
    750,
    1000,
  ];
  
  const QuickAdd = ({
    onAdd,
    loading,
  }) => {
    return (
      <div>
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50">
            <GlassWater className="h-4 w-4 text-sky-500" />
          </div>
  
          <div>
            <h2 className="font-semibold text-slate-900">
              Quick add
            </h2>
  
            <p className="text-xs text-slate-400">
              Log your next glass
            </p>
          </div>
        </div>
  
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {amounts.map((amount) => (
            <button
              key={amount}
              disabled={loading}
              onClick={() => onAdd(amount)}
              className="
                group
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-4
                text-center
                transition-all
                duration-200
                hover:-translate-y-1
                hover:border-sky-200
                hover:bg-sky-50
                hover:shadow-lg
                hover:shadow-sky-500/5
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 transition group-hover:bg-white">
                <Plus className="h-4 w-4 text-slate-500 group-hover:text-sky-500" />
              </div>
  
              <p className="text-sm font-bold text-slate-800">
                {amount} ml
              </p>
            </button>
          ))}
        </div>
      </div>
    );
  }
  
  export default QuickAdd;