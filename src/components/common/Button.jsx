import {LoaderCircle} from "lucide-react"

const variants = {
    primary:
      "bg-sky-500 text-white shadow-lg shadow-sky-500/20 hover:bg-sky-600",
  
    secondary:
      "bg-slate-100 text-slate-700 hover:bg-slate-200",
  
    danger:
      "bg-red-500 text-white shadow-lg shadow-red-500/20 hover:bg-red-600",
  
    ghost:
      "bg-transparent text-slate-600 hover:bg-slate-100",
  };

const Button = ({
    children,
    variant = "primary",
    loading = false,
    disabled = false,
    type = "button",
    className = "",
    ...props
})=>{
    return (
        <button
        type={type}
        disabled={disabled || loading}
        className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 ${variants[variant]} ${className}`} {...props}
        >
            {loading && (
                <LoaderCircle className="h-4 w-4 animate-spin"/>
            )}
            {children}
        </button>
    )
}

export default Button