"use client"

import type React from "react"

interface FolderItemProps {
  icon: React.ReactNode
  children: React.ReactNode
  count?: number
  onClick?: () => void
}

export const FolderItem: React.FC<FolderItemProps> = ({ icon, children, count, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors"
    >
      <div className="flex items-center gap-2.5">
        {icon}
        <span>{children}</span>
      </div>
      {count && <span className="text-xs text-gray-400">{count}</span>}
    </button>
  )
}
