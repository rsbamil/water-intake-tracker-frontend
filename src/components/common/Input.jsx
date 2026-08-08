import React from "react";

const Input = ({ label, error, id, className = "", ...props }) => {
  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-slate-700"
        >
          {label}
        </label>
      )}

      <input
        id={id}
        className={`
      w-full
      rounded-xl
      border
      bg-white
      px-4
      py-3
      text-sm
      text-slate-900
      outline-none
      transition
      placeholder:text-slate-400
      focus:ring-4
      ${
        error
          ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
          : "border-slate-200 focus:border-sky-500 focus:ring-sky-500/10"
      }
      ${className}
    `}
        {...props}
      />

      {error && <p className="text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
