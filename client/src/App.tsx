"use client"

import { useState, useMemo } from "react"
import { Sidebar } from "./components/Sidebar/Sidebar"
import { Header } from "./components/Header/Header"
import { ActionBar } from "./components/ActionBar/ActionBar"
import { FileGrid, type FileItem } from "./components/FileGrid/FileGrid"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/ui/Tabs"

// Mock data
const mockFiles: FileItem[] = [
  {
    id: "1",
    title: "Apresentação Q4 2024",
    modified: "2 horas atrás",
    sizeTotal: "2.4 MB",
    shared: true,
    starred: true,
  },
  {
    id: "2",
    title: "Vídeos do Produto",
    modified: "1 dia atrás",
    shared: true,
  },
  {
    id: "3",
    title: "Relatório Financeiro",
    modified: "3 dias atrás",
    sizeTotal: "1.8 MB",
  },
  {
    id: "4",
    title: "Demo do Cliente",
    modified: "1 semana atrás",
    sizeTotal: "45.2 MB",
    starred: true,
  },
  {
    id: "5",
    title: "Documentação API",
    modified: "2 semanas atrás",
  },
  {
    id: "6",
    title: "Contrato Assinado",
    modified: "1 mês atrás",
    sizeTotal: "892 KB",
    shared: true,
  },
]

export default function FileManager() {
  const [activeSection, setActiveSection] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("recent")

  // Filter files based on search query
  const filteredFiles = useMemo(() => {
    return mockFiles.filter((file) => file.title.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [searchQuery])

  // Filter files based on active tab
  const tabFilteredFiles = useMemo(() => {
    switch (activeTab) {
      case "starred":
        return filteredFiles.filter((file) => file.starred)
      case "shared":
        return filteredFiles.filter((file) => file.shared)
      default:
        return filteredFiles
    }
  }, [filteredFiles, activeTab])

  const handleFileClick = (file: FileItem) => {
    console.log("File clicked:", file)
    // Implement file opening logic here
  }

  const handleCreateNew = () => {
    console.log("Create new file")
    // Implement create new file logic
  }

  const handleUpload = () => {
    console.log("Upload files")
    // Implement file upload logic
  }

  const handleCreateFolder = () => {
    console.log("Create new folder")
    // Implement create folder logic
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />

      <div className="flex-1 flex flex-col">
        <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        <div className="flex-1 p-6">
          <ActionBar onCreateNew={handleCreateNew} onUpload={handleUpload} onCreateFolder={handleCreateFolder} />

          <Tabs defaultValue="recent" className="mb-6">
            <TabsList className="bg-gray-100">
              <TabsTrigger value="recent">Recentes</TabsTrigger>
              <TabsTrigger value="starred">Favoritos</TabsTrigger>
              <TabsTrigger value="shared">Compartilhados</TabsTrigger>
            </TabsList>

            <TabsContent value="recent" className="mt-6">
              <FileGrid files={tabFilteredFiles} onFileClick={handleFileClick} />
            </TabsContent>

            <TabsContent value="starred" className="mt-6">
              <FileGrid files={tabFilteredFiles} onFileClick={handleFileClick} />
            </TabsContent>

            <TabsContent value="shared" className="mt-6">
              <FileGrid files={tabFilteredFiles} onFileClick={handleFileClick} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
