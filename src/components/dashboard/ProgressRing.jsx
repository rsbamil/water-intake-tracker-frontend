const ProgressRing =({
    progress = 0,
    size = 220,
    strokeWidth = 14,
  }) => {
    const radius =
      (size - strokeWidth) / 2;
  
    const circumference =
      2 * Math.PI * radius;
  
    const offset =
      circumference -
      (progress / 100) * circumference;
  
    return (
      <div
        className="relative"
        style={{
          width: size,
          height: size,
        }}
      >
        <svg
          width={size}
          height={size}
          className="-rotate-90"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-slate-100"
          />
  
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            className="text-sky-500 transition-all duration-1000 ease-out"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
  
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold tracking-tight text-slate-900">
            {progress}%
          </span>
  
          <span className="mt-1 text-sm font-medium text-slate-400">
            of daily goal
          </span>
        </div>
      </div>
    );
  }
  
  export default ProgressRing;