"use client"

import type React from "react"
import { useState } from "react"
import { ShareModal } from "../Forms/ShareModal"
import { Button } from "../ui/Button"
import { Dropdown, DropdownItem } from "../ui/Dropdown"
import { ConfirmationModal } from "../ui/ConfirmationModal"

import {
  FolderIcon,
  VideoIcon,
  FileTextIcon,
  StarIcon,
  Share2Icon,
  MoreHorizontalIcon,
  TrashIcon,
  AlertTriangleIcon,
} from "../ui/Icons"

export type FileType = "folder" | "video" | "document" | "presentation"

export interface FileItem {
  id: string;
  title: string;
  type: FileType;
  modified: string;        // No futuro, pode ser um tipo Date, mas string funciona para começar.
  sizeTotal?: string;      // Opcional, pois pastas não têm tamanho.
  shared_emails?: string[]; 
  shared: boolean;         
  starred: boolean;       
}

interface FileCardProps {
  fileItem: FileItem
  onClick?: () => void
  onDelete?: (id: string) => void
  onShare?: (id: string, emails: string[]) => void
}

export const FileCard: React.FC<FileCardProps> = ({
  fileItem,
  onClick,
  onDelete,
  onShare,
}) => {

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [isStarred, setIsStarred] = useState(fileItem.starred)
  const [isShared, setIsShared] = useState(fileItem.shared)

  const getIcon = () => {
    switch (fileItem.type) {
      case "folder":
        return <FolderIcon className="h-8 w-8 text-blue-500" />
      case "video":
        return <VideoIcon className="h-8 w-8 text-red-500" />
      case "document":
        return <FileTextIcon className="h-8 w-8 text-green-500" />
      case "presentation":
        return <FileTextIcon className="h-8 w-8 text-orange-500" />
      default:
        return <FileTextIcon className="h-8 w-8 text-gray-500" />
    }
  }

  const getTypeColor = () => {
    switch (fileItem.type) {
      case "folder":
        return "bg-blue-50 border-blue-200"
      case "video":
        return "bg-red-50 border-red-200"
      case "document":
        return "bg-green-50 border-green-200"
      case "presentation":
        return "bg-orange-50 border-orange-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  const handleShare = () => {
    setIsShareModalOpen(true)
  }

  const handleShareIconClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    handleShare()
  }

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent card click when clicking on interactive
    if ((e.target as HTMLElement).closest("[data-interactive]")) {
      return
    }
    onClick?.()
  }

  const handleFavoriteClick = (e: React.MouseEvent) => {
    
    fetch('http://localhost:3333/favoritar-colecao', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: fileItem.id, starred: !isStarred }),
    })
    .then((res) => setIsStarred(!isStarred))
    .catch((err) => console.log('error', err))

  }

  const handleDelete = () => {
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDelete = () => {

    console.log("Delete collection data:", fileItem.id)

    fetch('http://localhost:3333/delete-colecao', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: fileItem.id }),
    })
    .then((res) => onDelete?.(fileItem.id))
    .catch((err) => console.log('error', err))
    
    setIsDeleteModalOpen(false)

  }

  const handleConfirmShare = (emails: string[]) => {

    fetch('http://localhost:3333/compartilhar-colecao', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: fileItem.id, emails: emails, shared: !isShared }),
    })
    .then((res) => onShare?.(fileItem.id, emails))
    .catch((err) => console.log('error', err))
    
    setIsShared(!isShared)
    setIsShareModalOpen(false)
  }

  return (
    <>
      <div
        onClick={handleCardClick}
        className="group relative bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-gray-300 transition-all duration-200 cursor-pointer"
      >
        <div className="flex items-start justify-between mb-3">
          <div className={`p-3 rounded-lg ${getTypeColor()}`}>
            {getIcon()}
          </div>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {isStarred && <StarIcon onClick={handleFavoriteClick} className="h-4 w-4 text-yellow-500 fill-current" />}
          {!isStarred && <StarIcon onClick={handleFavoriteClick} className="h-4 w-4 text-gray-400" />}  
            <Share2Icon className="h-4 w-4 text-blue-500" onClick={handleShareIconClick}/>

            <div data-interactive>
              <Dropdown
                trigger={
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
                    <MoreHorizontalIcon className="h-4 w-4" />
                  </Button>
                }
                align="right"
              >
                <DropdownItem icon={<TrashIcon className="h-4 w-4" />} onClick={handleDelete} variant="danger">
                  Excluir
                </DropdownItem>
              </Dropdown>
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <h3 className="font-semibold text-gray-900 text-sm leading-tight">{fileItem.title}</h3>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>{fileItem.modified}</span>
            {fileItem.sizeTotal && (
              <>
                <span>•</span>
                <span>{fileItem.sizeTotal}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Excluir arquivo"
        message={`Tem certeza que deseja excluir "${fileItem.title}"? Esta ação não pode ser desfeita.`}
        confirmText="Excluir"
        cancelText="Cancelar"
        variant="danger"
        icon={<AlertTriangleIcon className="h-6 w-6 text-red-600" />}
      />

      <ShareModal
        file={fileItem}
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        onShare={handleConfirmShare}
      />
    </>
  )
}
