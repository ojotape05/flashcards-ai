"use client"

import { useState, useMemo, useEffect } from "react"
import { Sidebar } from "./components/Sidebar/Sidebar"
import { Header } from "./components/Header/Header"
import { ActionBar } from "./components/ActionBar/ActionBar"
import { type FileItem } from "./components/FileGrid/FileCard"
import { FileGrid } from "./components/FileGrid/FileGrid"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/ui/Tabs"
import { VideoViewer } from "./components/Viewers/VideoViewer"
import { PDFViewer } from "./components/Viewers/PDFViewer"
import { SpreadsheetViewer } from "./components/Viewers/SpreadsheetViewer"
import { FolderViewer, type BreadcrumbItem } from "./components/Viewers/FolderViewer"
import { ShareModal } from "./components/Forms/ShareModal"

type ViewerType = "video" | "pdf" | "spreadsheet" | "folder" | null

export default function FileManager() {
  const [activeSection, setActiveSection] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("recent")
  const [mockFiles, setMockFiles] = useState<FileItem[]>([])
  const [currentViewer, setCurrentViewer] = useState<ViewerType>(null)
  const [currentFile, setCurrentFile] = useState<FileItem | null>(null)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [currentFolderId, setCurrentFolderId] = useState<string>("")
  const [breadcrumbPath, setBreadcrumbPath] = useState<BreadcrumbItem[]>([])


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
    setCurrentFile(file)

    switch (file.type) {
      case "video":
        setCurrentViewer("video")
        break
      case "document":
        // Assume documents are PDFs for this demo
        setCurrentViewer("pdf")
        break
      case "presentation":
        // Assume presentations are spreadsheets for this demo
        setCurrentViewer("spreadsheet")
        break
      case "folder":
        setCurrentViewer("folder")
        setCurrentFolderId(file.id)
        setBreadcrumbPath([{ name: file.title, id: file.id }])
        break
      default:
        console.log("File clicked:", file)
    }
  }

  const handleFileDelete = (fileId: string) => {

    setMockFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId))
    console.log("File deleted:", fileId)
  }

  const handleFileShare = (fileId: string, emails: string[]) => {
    // Update file to mark as shared
    setMockFiles((prevFiles) => prevFiles.map((file) => (file.id === fileId ? { ...file, shared_emails: emails, shared: emails.length > 0 } : file)))
    console.log("File shared:", { fileId, emails })
    // Here you would typically send the sharing data to your backend
  }

  const handleCreateNew = (data: FileItem) => {
    setMockFiles((prevFiles) => [...prevFiles, data]);
  }

  const handleUpload = () => {
    console.log("Upload files")
    // Implement file upload logic
  }

  const handleCreateFolder = () => {
    console.log("Create new folder")
    // Implement create folder logic
  }

  const handleCloseViewer = () => {
    setCurrentViewer(null)
    setCurrentFile(null)
    setCurrentFolderId("")
    setBreadcrumbPath([])
  }

  const handleShareFromViewer = () => {
    setIsShareModalOpen(true)
  }

  const handleShareModalClose = () => {
    setIsShareModalOpen(false)
  }

  const handleShareConfirm = (emails: string[]) => {
    if (currentFile) {
      handleFileShare(currentFile.id, emails)
    }
    setIsShareModalOpen(false)
  }

  const handleNavigateToFolder = (folderId: string, newBreadcrumbPath: BreadcrumbItem[]) => {
    // Find the folder by ID (in a real app, you'd fetch from API)
    const folderName = newBreadcrumbPath[newBreadcrumbPath.length - 1]?.name || "Pasta"

    setCurrentFolderId(folderId)
    setBreadcrumbPath(newBreadcrumbPath)
    setCurrentFile({
      id: folderId,
      title: folderName,
      type: "folder",
      modified: "Agora",
    })
    setCurrentViewer("folder")
  }

  // Render viewers
  if (currentViewer && currentFile) {
    switch (currentViewer) {
      case "video":
        return (
          <VideoViewer
            fileName={currentFile.title}
            fileSize={currentFile.sizeTotal}
            onClose={handleCloseViewer}
            onShare={handleShareFromViewer}
          />
        )
      case "pdf":
        return (
          <PDFViewer
            fileName={currentFile.title}
            fileSize={currentFile.sizeTotal}
            onClose={handleCloseViewer}
            onShare={handleShareFromViewer}
          />
        )
      case "spreadsheet":
        return (
          <SpreadsheetViewer
            fileName={currentFile.title}
            fileSize={currentFile.sizeTotal}
            onClose={handleCloseViewer}
            onShare={handleShareFromViewer}
          />
        )
      case "folder":
        return (
          <FolderViewer
            folderName={currentFile.title}
            folderId={currentFolderId}
            folderSize={currentFile.sizeTotal}
            breadcrumbPath={breadcrumbPath}
            onClose={handleCloseViewer}
            onFileClick={handleFileClick}
            onFileDelete={handleFileDelete}
            onFileShare={handleFileShare}
            onNavigateToFolder={handleNavigateToFolder}
          />
        )
    }
  }

  return (
    <>
      <div className="flex h-screen bg-gray-50">
        <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />

        <div className="flex-1 flex flex-col">
          <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

          <div className="flex-1 p-6">
            <ActionBar onCreateNew={handleCreateNew} onUpload={handleUpload} onCreateFolder={handleCreateFolder} />

            <Tabs defaultValue={activeTab} className="mb-6" onChange={setActiveTab}>
              <TabsList className="bg-gray-100">
                <TabsTrigger value="recent">Recentes</TabsTrigger>
                <TabsTrigger value="starred">Favoritos</TabsTrigger>
                <TabsTrigger value="shared">Compartilhados</TabsTrigger>
              </TabsList>

              <TabsContent value="recent" className="mt-6">
                <FileGrid
                  files={tabFilteredFiles}
                  onFileClick={handleFileClick}
                  onFileDelete={handleFileDelete}
                  onFileShare={handleFileShare}
                />
              </TabsContent>

              <TabsContent value="starred" className="mt-6">
                <FileGrid
                    files={tabFilteredFiles}
                    onFileClick={handleFileClick}
                    onFileDelete={handleFileDelete}
                    onFileShare={handleFileShare}
                />
              </TabsContent>

              <TabsContent value="shared" className="mt-6">
                <FileGrid
                  files={tabFilteredFiles}
                  onFileClick={handleFileClick}
                  onFileDelete={handleFileDelete}
                  onFileShare={handleFileShare}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {isShareModalOpen && currentFile && (
        <ShareModal
          file={currentFile}
          isOpen={isShareModalOpen}
          onClose={handleShareModalClose}
          onShare={handleShareConfirm}
        />
      )}
    </>
  )
}
