"use client"

import type React from "react"
import { FileCard, type FileItem } from "./FileCard"

interface FileGridProps {
  files: FileItem[]
  onFileClick?: (file: FileItem) => void
  onFileDelete: (fileId: string) => void
  onFileShare?: (fileId: string, emails: string[]) => void
}

export const FileGrid: React.FC<FileGridProps> = ({ files, onFileClick, onFileDelete, onFileShare }) => {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {files.map((file) => (
        <FileCard
          key={file.id}
          fileItem={file}
          onClick={() => onFileClick?.(file)}
          onDelete={onFileDelete}
          onShare={onFileShare}
        />
      ))}
    </div>
  )
}
