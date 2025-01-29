import React from "react";

function Button({
  children,
  type = "button",
  textColor = "text-white",
  bgColor = "bg-blue-600",
  className = "",
  ...props
}) {
  return (
    <button
      className={`px-4 py-2 ${bgColor} ${textColor} ${className} cursor-pointer`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
