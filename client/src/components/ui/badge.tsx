import type React from "react"

interface BadgeProps {
  children: React.ReactNode
  variant?: "default" | "secondary" | "success" | "warning" | "danger"
  size?: "sm" | "md"
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = "default", size = "sm" }) => {
  const baseClasses = "inline-flex items-center font-medium rounded-full"

  const variantClasses = {
    default: "bg-blue-100 text-blue-800",
    secondary: "bg-gray-100 text-gray-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    danger: "bg-red-100 text-red-800",
  }

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
  }

  return <span className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}>{children}</span>
}
