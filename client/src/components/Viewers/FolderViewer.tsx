"use client"

import React from "react"
import { useState, useMemo } from "react"
import { Button } from "../ui/Button"
import { FileGrid } from "../FileGrid/FileGrid"
import { type FileItem } from "../FileGrid/FileCard"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/Tabs"
import { XIcon, EditIcon, FolderIcon, ChevronRightIcon, StarIcon, Share2Icon } from "../ui/Icons"
import { EditFolderModal } from "../Forms/EditFolderModal"

export interface BreadcrumbItem {
  name: string
  id: string
}

interface FolderViewerProps {
  folderName: string
  folderId: string
  breadcrumbPath: BreadcrumbItem[]
  onClose: () => void
  onFileClick: (file: FileItem) => void
  onFileDelete?: (fileId: string) => void
  onFileShare?: (fileId: string, emails: string[]) => void
  onNavigateToFolder?: (folderId: string, breadcrumbPath: BreadcrumbItem[]) => void
}

export const FolderViewer: React.FC<FolderViewerProps> = ({
  folderName,
  folderId,
  folderSize,
  breadcrumbPath,
  onClose,
  onFileClick,
  onFileDelete,
  onFileShare,
  onNavigateToFolder,
}) => {
  const [activeTab, setActiveTab] = useState("recent")
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [folderData, setFolderData] = useState({
    title: folderName,
    emails: ["user@example.com", "team@company.com"], // Mock shared emails
    isShared: true, // Mock shared state
    isStarred: false, // Mock starred state
  })

  // Mock files inside the folder - different content based on folder
  const getFolderFiles = (id: string): FileItem[] => {
    const baseFiles: Record<string, FileItem[]> = {
      "2": [
        // Vídeos do Produto
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
          title: "Video Demo Principal",
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
          title: "Marketing Materials",
          type: "folder",
          modified: "3 dias atrás",
        },
      ],
      "5": [
        // Documentação API
        {
          id: "api1",
          title: "API Reference Guide",
          type: "document",
          modified: "1 hora atrás",
          size: "3.2 MB",
          starred: true,
        },
        {
          id: "api2",
          title: "Tutorial Videos",
          type: "folder",
          modified: "2 dias atrás",
        },
        {
          id: "api3",
          title: "Code Examples",
          type: "document",
          modified: "1 semana atrás",
          size: "1.5 MB",
          shared: true,
        },
      ],
      f5: [
        // Marketing Materials (subfolder)
        {
          id: "mk1",
          title: "Brand Guidelines",
          type: "document",
          modified: "1 dia atrás",
          size: "2.8 MB",
        },
        {
          id: "mk2",
          title: "Product Photos",
          type: "folder",
          modified: "3 dias atrás",
        },
        {
          id: "mk3",
          title: "Campaign Video",
          type: "video",
          modified: "1 semana atrás",
          size: "67.3 MB",
          starred: true,
        },
        {
          id: "mk4",
          title: "Social Media Assets",
          type: "presentation",
          modified: "2 semanas atrás",
          size: "4.1 MB",
          shared: true,
        },
      ],
      api2: [
        // Tutorial Videos (subfolder)
        {
          id: "tv1",
          title: "Getting Started",
          type: "video",
          modified: "2 dias atrás",
          size: "15.6 MB",
        },
        {
          id: "tv2",
          title: "Advanced Features",
          type: "video",
          modified: "1 semana atrás",
          size: "28.9 MB",
        },
        {
          id: "tv3",
          title: "Best Practices",
          type: "document",
          modified: "2 semanas atrás",
          size: "1.1 MB",
          shared: true,
        },
      ],
    }

    return baseFiles[id] || []
  }
  
  // Mock files inside the folder
  const folderFiles = getFolderFiles(folderId)

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

  const handleEditFolder = () => {
    setIsEditModalOpen(true)
  }

  const handleSaveFolder = (data: { title: string; emails: string[]; isShared: boolean; isStarred: boolean }) => {
    setFolderData(data)
    console.log("Folder updated:", data)
    // Here you would typically send the data to your backend
  }

  const handleToggleStar = () => {
    setFolderData((prev) => ({ ...prev, isStarred: !prev.isStarred }))
    console.log("Folder starred:", !folderData.isStarred)
  }

  const handleBreadcrumbClick = (index: number) => {
    if (index === breadcrumbPath.length - 1) {
      // Clicked on current folder, do nothing
      return
    }

    if (index === -1) {
      // Clicked on "Todos os arquivos", close folder viewer
      onClose()
      return
    }

    // Navigate to the clicked folder
    const targetPath = breadcrumbPath.slice(0, index + 1)
    const targetFolder = breadcrumbPath[index]
    onNavigateToFolder?.(targetFolder.id, targetPath)
  }

  const handleSubfolderClick = (file: FileItem) => {
    if (file.type === "folder") {
      // Add current folder to breadcrumb and navigate to subfolder
      const newPath = [...breadcrumbPath, { name: file.title, id: file.id }]
      onNavigateToFolder?.(file.id, newPath)
    } else {
      onFileClick(file)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm">
              <FolderIcon className="h-4 w-4 text-gray-600" />

              {/* Root folder */}
              <button
                onClick={() => handleBreadcrumbClick(-1)}
                className="text-gray-600 hover:text-gray-900 hover:underline transition-colors"
              >
                Todos os arquivos
              </button>

              {/* Breadcrumb path */}
              {breadcrumbPath.map((item, index) => (
                <React.Fragment key={item.id}>
                  <ChevronRightIcon className="h-4 w-4 text-gray-400" />
                  <button
                    onClick={() => handleBreadcrumbClick(index)}
                    className={`transition-colors ${
                      index === breadcrumbPath.length - 1
                        ? "font-medium text-gray-900 cursor-default"
                        : "text-gray-600 hover:text-gray-900 hover:underline"
                    }`}
                  >
                    {item.name}
                  </button>
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleToggleStar}
              className={folderData.isStarred ? "text-yellow-600 border-yellow-300 bg-yellow-50" : ""}
            >
              <StarIcon className={`h-4 w-4 mr-2 ${folderData.isStarred ? "fill-current" : ""}`} />
              {folderData.isStarred ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
            </Button>
            <Button variant="outline" size="sm" onClick={handleEditFolder}>
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
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold text-gray-900">{folderData.title}</h1>
              {folderData.isStarred && <StarIcon className="h-5 w-5 text-yellow-500 fill-current" />}
              {folderData.isShared && (
                <div className="flex items-center gap-1 text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                  <Share2Icon className="h-3 w-3" />
                  <span>Compartilhada</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span>
                {folderFiles.length} {folderFiles.length === 1 ? "item" : "itens"}
              </span>
              <span>•</span>
              <span>{folderSize}</span>
            </div>
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
              onFileClick={handleSubfolderClick}
              onFileDelete={onFileDelete}
              onFileShare={onFileShare}
            />
          </TabsContent>

          <TabsContent value="starred" className="mt-6">
            <FileGrid
              files={filteredFiles}
              onFileClick={handleSubfolderClick}
              onFileDelete={onFileDelete}
              onFileShare={onFileShare}
            />
          </TabsContent>

          <TabsContent value="shared" className="mt-6">
            <FileGrid
              files={filteredFiles}
              onFileClick={handleSubfolderClick}
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

      <EditFolderModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveFolder}
        folderData={folderData}
      />
    </div>
  )
}
