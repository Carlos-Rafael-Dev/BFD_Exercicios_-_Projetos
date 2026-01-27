import type { ButtonHTMLAttributes } from "react";

type ButtonProps = {
  variant?: "primary" | "secondary";
  active?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  variant = "primary",
  active = false,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`btn btn-${variant} ${active ? "btn-active" : ""} ${className}`}
    >
      {children}
    </button>
  );
}
