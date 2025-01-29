import React, { useId, forwardRef } from "react";

function Input({ label, labelColor = "text-white", type = "text", className = "", ...props }, ref) {
  const id = useId();
  return (
    <div>
      {label && <label className={`${labelColor}`} htmlFor={id}>{label}</label>}
      <input
        type={type}
        className={`${className}`}
        {...props}
        ref={ref}
        id={id}
      />
    </div>
  );
}

export default forwardRef(Input);
