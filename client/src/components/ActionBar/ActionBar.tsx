"use client"

import type React from "react"
import { Button } from "../ui/Button"
import { PlusIcon, UploadIcon, FolderIcon } from "../ui/Icons"

interface ActionBarProps {
  onCreateNew?: () => void
  onUpload?: () => void
  onCreateFolder?: () => void
}

export const ActionBar: React.FC<ActionBarProps> = ({ onCreateNew, onUpload, onCreateFolder }) => {
  return (
    <div className="flex items-center gap-3 mb-6">
      <Button onClick={onCreateNew}>
        <PlusIcon className="h-4 w-4 mr-2" />
        Novo
      </Button>
      <Button variant="outline" onClick={onUpload}>
        <UploadIcon className="h-4 w-4 mr-2" />
        Upload
      </Button>
      <Button variant="outline" onClick={onCreateFolder}>
        <FolderIcon className="h-4 w-4 mr-2" />
        Nova pasta
      </Button>
    </div>
  )
}
