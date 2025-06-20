"use client"

import type React from "react"
import { Badge } from "../ui/Badge"

interface NavItemProps {
  icon: React.ReactNode
  children: React.ReactNode
  active?: boolean
  count?: number
  onClick?: () => void
}

export const NavItem: React.FC<NavItemProps> = ({ icon, children, active = false, count, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-lg transition-colors
        ${active ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"}
      `}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span>{children}</span>
      </div>
      {count && <Badge variant="secondary">{count}</Badge>}
    </button>
  )
}
