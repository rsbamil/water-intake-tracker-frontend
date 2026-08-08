const Card = ({
    children,
    className = "",
  }) =>{
    return (
      <div
        className={`
          rounded-2xl
          border
          border-slate-200/80
          bg-white
          shadow-sm
          transition-shadow
          duration-200
          hover:shadow-md
          ${className}
        `}
      >
        {children}
      </div>
    );
  }
  
  export default Card;