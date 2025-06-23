"use client"

import type React from "react"
import { FileCard } from "./FileCard"
// import { FileItem } from '@types'

export interface FileItem {
  id: string;
  title: string;
  modified: string;      // No futuro, pode ser um tipo Date, mas string funciona para começar.
  sizeTotal?: string;    // Opcional, pois pastas não têm tamanho.
  shared?: boolean;      // Opcional.
  starred?: boolean;     // Opcional.
}

interface FileGridProps {
  files: FileItem[]
  onFileClick?: (file: FileItem) => void
  onFileDelete: (fileId: string) => void
}

export const FileGrid: React.FC<FileGridProps> = ({ files, onFileClick, onFileDelete }) => {

  const handleDeleteCollectionSubmit = (id: string) => {
    console.log("Delete collection data:", id)

    fetch('http://localhost:3333/delete-colecao', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          id: id
        }
      }),
    })
    .then((res) => onFileDelete(id))
    .catch((err) => console.log('error', err))
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {files.map((file) => (
        <FileCard
          key={file.id}
          id={file.id}
          title={file.title}
          sizeTotal={file.sizeTotal}
          modified={file.modified}
          shared={file.shared}
          starred={file.starred}
          onClick={() => onFileClick?.(file)}
          onDelete={handleDeleteCollectionSubmit}
        />
      ))}
    </div>
  )
}
