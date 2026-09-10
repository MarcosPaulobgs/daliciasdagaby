"use client";

import styles from "./Button.module.css";

export default function Button({
  children,
  onClick,
  variant = "primary", // "primary" | "secondary" | "outline" | "danger"
  size = "md",          // "sm" | "md" | "lg"
  type = "button",
  disabled = false,
  className = "",
  ...props
}) {
  const buttonClasses = `
    ${styles.button} 
    ${styles[variant] || ""} 
    ${styles[size] || ""} 
    ${className}
  `.trim();

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      {...props}
    >
      {children}
    </button>
  );
}