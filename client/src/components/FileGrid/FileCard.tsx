"use client"

import type React from "react"
import { useState } from "react"
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

interface FileCardProps {
  id: string
  title: string
  sizeTotal?: string
  modified: string
  shared?: boolean
  starred?: boolean
  onClick?: () => void
  onDelete?: (id: string) => void
}

export const FileCard: React.FC<FileCardProps> = ({
  id,
  title,
  sizeTotal,
  modified,
  shared = false,
  starred = false,
  onClick,
  onDelete,
}) => {

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const getIcon = () => {
    return <FolderIcon className="h-8 w-8 text-blue-500" />
  }

  const getTypeColor = () => {
    return "bg-blue-50 border-blue-200"
  }

  const handleDelete = () => {
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDelete = () => {
    onDelete?.(id)
    setIsDeleteModalOpen(false)
  }

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent card click when clicking on dropdown
    if ((e.target as HTMLElement).closest("[data-dropdown]")) {
      return
    }
    onClick?.()
  }

  return (
    <>
      <div
        onClick={handleCardClick}
        className="group relative bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-gray-300 transition-all duration-200 cursor-pointer"
      >
        <div className="flex items-start justify-between mb-3">
          <div className={`p-3 rounded-lg ${getTypeColor()}`}>{getIcon()}</div>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {starred && <StarIcon className="h-4 w-4 text-yellow-500 fill-current" />}
            {shared && <Share2Icon className="h-4 w-4 text-blue-500" />}

            <div data-dropdown>
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
          <h3 className="font-semibold text-gray-900 text-sm leading-tight">{title}</h3>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>{modified}</span>
            {sizeTotal && (
              <>
                <span>•</span>
                <span>{sizeTotal}</span>
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
        message={`Tem certeza que deseja excluir "${title}"? Esta ação não pode ser desfeita.`}
        confirmText="Excluir"
        cancelText="Cancelar"
        variant="danger"
        icon={<AlertTriangleIcon className="h-6 w-6 text-red-600" />}
      />
    </>
  )
}
