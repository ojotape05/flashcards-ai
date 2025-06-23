"use client"

import { useState, useMemo, useEffect } from "react"
import { Sidebar } from "./components/Sidebar/Sidebar"
import { Header } from "./components/Header/Header"
import { ActionBar } from "./components/ActionBar/ActionBar"
import { FileGrid, type FileItem } from "./components/FileGrid/FileGrid"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/ui/Tabs"

export default function FileManager() {
  const [activeSection, setActiveSection] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("recent")
  const [mockFiles, setMockFiles] = useState<FileItem[]>([])

  useEffect(() => {

    fetch("http://localhost:3333/buscar-colecoes", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(resp => resp.json())
    .then(json => {
      setMockFiles(json)
    })
    .catch(error => console.error("Erro ao buscar dados:", error))

  }, []);

  // Filter files based on search query
  const filteredFiles = useMemo(() => {
    return mockFiles.filter((file) =>
      file.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery, mockFiles])

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

  const handleFileDelete = (fileId: string) => {
    setMockFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId))
    console.log("File deleted:", fileId)
  }

  const handleCreateNew = (data: FileItem[]) => {
      setMockFiles(data)
      return data
  }

  // const handleCreateNew = () => {
  //   console.log("Create new file")
  //   // Implement create new file logic

  // }

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
              <FileGrid files={tabFilteredFiles} onFileClick={handleFileClick} onFileDelete={handleFileDelete} />
            </TabsContent>

            <TabsContent value="starred" className="mt-6">
              <FileGrid files={tabFilteredFiles} onFileClick={handleFileClick} onFileDelete={handleFileDelete} />
            </TabsContent>

            <TabsContent value="shared" className="mt-6">
              <FileGrid files={tabFilteredFiles} onFileClick={handleFileClick} onFileDelete={handleFileDelete} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
