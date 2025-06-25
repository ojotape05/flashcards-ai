"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "../ui/Button"
import { FileGrid, type FileItem } from "../FileGrid/FileGrid"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/Tabs"
import { XIcon, EditIcon, FolderIcon, ChevronRightIcon } from "../ui/Icons"

interface FolderViewerProps {
  folderName: string
  onClose: () => void
  onFileClick: (file: FileItem) => void
  onFileDelete?: (fileId: string) => void
  onFileShare?: (fileId: string, emails: string[]) => void
}

export const FolderViewer: React.FC<FolderViewerProps> = ({
  folderName,
  onClose,
  onFileClick,
  onFileDelete,
  onFileShare,
}) => {
  const [activeTab, setActiveTab] = useState("recent")

  // Mock files inside the folder
  const folderFiles: FileItem[] = [
    {
      id: "f1",
      title: "Apresentação Produto A",
      type: "presentation",
      modified: "1 hora atrás",
      size: "1.2 MB",
      starred: true,
    },
    {
      id: "f2",
      title: "Video Demo",
      type: "video",
      modified: "2 horas atrás",
      size: "25.4 MB",
    },
    {
      id: "f3",
      title: "Especificações Técnicas",
      type: "document",
      modified: "1 dia atrás",
      size: "856 KB",
      shared: true,
    },
    {
      id: "f4",
      title: "Planilha de Custos",
      type: "document",
      modified: "2 dias atrás",
      size: "445 KB",
    },
    {
      id: "f5",
      title: "Subfolder Marketing",
      type: "folder",
      modified: "3 dias atrás",
    },
  ]

  const filteredFiles = folderFiles.filter((file) => {
    switch (activeTab) {
      case "starred":
        return file.starred
      case "shared":
        return file.shared
      default:
        return true
    }
  })

  return (
    <div className="fixed inset-0 z-50 bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FolderIcon className="h-4 w-4" />
              <span>Todos os arquivos</span>
              <ChevronRightIcon className="h-4 w-4" />
              <span className="font-medium text-gray-900">{folderName}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <EditIcon className="h-4 w-4 mr-2" />
              Editar Pasta
            </Button>
            <Button variant="outline" size="sm" onClick={onClose}>
              <XIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Folder Info */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <FolderIcon className="h-8 w-8 text-blue-500" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">{folderName}</h1>
            <p className="text-sm text-gray-500">{folderFiles.length} itens</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-auto">
        <Tabs defaultValue="recent" className="mb-6">
          <TabsList className="bg-gray-100">
            <TabsTrigger value="recent">Recentes</TabsTrigger>
            <TabsTrigger value="starred">Favoritos</TabsTrigger>
            <TabsTrigger value="shared">Compartilhados</TabsTrigger>
          </TabsList>

          <TabsContent value="recent" className="mt-6">
            <FileGrid
              files={filteredFiles}
              onFileClick={onFileClick}
              onFileDelete={onFileDelete}
              onFileShare={onFileShare}
            />
          </TabsContent>

          <TabsContent value="starred" className="mt-6">
            <FileGrid
              files={filteredFiles}
              onFileClick={onFileClick}
              onFileDelete={onFileDelete}
              onFileShare={onFileShare}
            />
          </TabsContent>

          <TabsContent value="shared" className="mt-6">
            <FileGrid
              files={filteredFiles}
              onFileClick={onFileClick}
              onFileDelete={onFileDelete}
              onFileShare={onFileShare}
            />
          </TabsContent>
        </Tabs>

        {filteredFiles.length === 0 && (
          <div className="text-center py-12">
            <FolderIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Pasta vazia</h3>
            <p className="text-gray-500">Esta pasta não contém arquivos no momento.</p>
          </div>
        )}
      </div>
    </div>
  )
}
