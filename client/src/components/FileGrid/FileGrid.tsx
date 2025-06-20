"use client"

import type React from "react"
import { FileCard, type FileType } from "./FileCard"

export interface FileItem {
  id: string
  title: string
  type: FileType
  size?: string
  modified: string
  shared?: boolean
  starred?: boolean
}

interface FileGridProps {
  files: FileItem[]
  onFileClick?: (file: FileItem) => void
}

export const FileGrid: React.FC<FileGridProps> = ({ files, onFileClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {files.map((file) => (
        <FileCard
          key={file.id}
          title={file.title}
          type={file.type}
          size={file.size}
          modified={file.modified}
          shared={file.shared}
          starred={file.starred}
          onClick={() => onFileClick?.(file)}
        />
      ))}
    </div>
  )
}
