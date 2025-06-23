"use client"

import type React from "react"
import { Button } from "../ui/Button"
import { PlusIcon, UploadIcon, FolderIcon } from "../ui/Icons"
import { Modal } from "../ui/Modal"
import { NewCollectionForm } from "../Forms/NewCollectionForm"
import { useState } from "react"
import type { FileItem } from "../FileGrid/FileGrid"

interface ActionBarProps {
  onCreateNew: (data: FileItem[]) => FileItem[]
  onUpload?: () => void
  onCreateFolder?: () => void
}

export const ActionBar: React.FC<ActionBarProps> = ({ onCreateNew, onUpload, onCreateFolder }) => {
  const [isNewCollectionModalOpen, setIsNewCollectionModalOpen] = useState(false)

  const handleCreateNew = () => {
    setIsNewCollectionModalOpen(true)
  }

  const handleNewCollectionSubmit = (data: { title: string; emails: string[]; isShared: boolean }) => {
    console.log("New collection data:", data)

    setIsNewCollectionModalOpen(false)
    fetch('http://localhost:3333/nova-colecao', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        new_data: {
          title: data.title,
          modified: "1 segundo atrás",
          sizeTotal: "0 KB",
          shared: data.isShared,
          emails: data.emails
        }
      }),
    })
    .then((res) => res.json())
    .then((json) => onCreateNew(json))
    .catch((err) => console.log('error'))

  }

  const handleNewCollectionCancel = () => {
    setIsNewCollectionModalOpen(false)
  }

  return (
    <>
      <div className="flex items-center gap-3 mb-6">
        <Button onClick={handleCreateNew}>
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

      <Modal isOpen={isNewCollectionModalOpen} onClose={handleNewCollectionCancel} title="Nova Coleção" size="md">
        <NewCollectionForm onSubmit={handleNewCollectionSubmit} onCancel={handleNewCollectionCancel} />
      </Modal>
    </>
  )
}
