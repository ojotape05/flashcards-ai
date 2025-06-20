"use client"

import type React from "react"
import { Button } from "../ui/Button"
import { FolderIcon, VideoIcon, FileTextIcon, StarIcon, Share2Icon, MoreHorizontalIcon } from "../ui/Icons"

interface FileCardProps {
  title: string
  size?: string
  modified: string
  shared?: boolean
  starred?: boolean
  onClick?: () => void
}

export const FileCard: React.FC<FileCardProps> = ({
  title,
  size,
  modified,
  shared = false,
  starred = false,
  onClick,
}) => {
  const getIcon = () => {
    return <FolderIcon className="h-8 w-8 text-blue-500" />
  }

  const getTypeColor = () => {
    return "bg-blue-50 border-blue-200"
  }

  return (
    <div
      onClick={onClick}
      className="group relative bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-gray-300 transition-all duration-200 cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`p-3 rounded-lg ${getTypeColor()}`}>{getIcon()}</div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {starred && <StarIcon className="h-4 w-4 text-yellow-500 fill-current" />}
          {shared && <Share2Icon className="h-4 w-4 text-blue-500" />}
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MoreHorizontalIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="font-semibold text-gray-900 text-sm leading-tight">{title}</h3>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>{modified}</span>
          {size && (
            <>
              <span>•</span>
              <span>{size}</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
