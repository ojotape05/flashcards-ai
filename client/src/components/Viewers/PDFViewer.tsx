"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "../ui/Button"
import { XIcon, ZoomInIcon, ZoomOutIcon, DownloadIcon, Share2Icon } from "../ui/Icons"

interface PDFViewerProps {
  fileName: string
  fileSize?: string
  onClose: () => void
  onShare?: () => void
}

export const PDFViewer: React.FC<PDFViewerProps> = ({ fileName, fileSize, onClose, onShare }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [zoom, setZoom] = useState(100)
  const totalPages = 5 // Mock total pages

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 25, 200))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 25, 50))
  }

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  return (
    <div className="fixed inset-0 z-50 bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">{fileName}</h1>
            {fileSize && <p className="text-sm text-gray-500">{fileSize}</p>}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onShare}>
              <Share2Icon className="h-4 w-4 mr-2" />
              Compartilhar
            </Button>
            <Button variant="outline" size="sm">
              <DownloadIcon className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" size="sm" onClick={onClose}>
              <XIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-gray-100 border-b border-gray-200 p-2">
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handlePrevPage} disabled={currentPage === 1}>
              ←
            </Button>
            <span className="text-sm">
              {currentPage} de {totalPages}
            </span>
            <Button variant="outline" size="sm" onClick={handleNextPage} disabled={currentPage === totalPages}>
              →
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleZoomOut} disabled={zoom <= 50}>
              <ZoomOutIcon className="h-4 w-4" />
            </Button>
            <span className="text-sm w-12 text-center">{zoom}%</span>
            <Button variant="outline" size="sm" onClick={handleZoomIn} disabled={zoom >= 200}>
              <ZoomInIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* PDF Content */}
      <div className="flex-1 overflow-auto bg-gray-800 p-4">
        <div className="flex justify-center">
          <div
            className="bg-white shadow-lg"
            style={{
              transform: `scale(${zoom / 100})`,
              transformOrigin: "top center",
            }}
          >
            {/* Mock PDF Page */}
            <div className="w-[595px] h-[842px] p-8 bg-white">
              <div className="space-y-4">
                <h1 className="text-2xl font-bold text-gray-900">Documento PDF - Página {currentPage}</h1>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    Este é um exemplo de visualização de PDF. O conteúdo seria renderizado aqui usando uma biblioteca
                    como PDF.js ou similar.
                  </p>
                  <p className="text-gray-700">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua.
                  </p>
                  <p className="text-gray-700">
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.
                  </p>
                </div>
                <div className="mt-8 p-4 bg-gray-100 rounded">
                  <h3 className="font-semibold text-gray-900">Seção Importante</h3>
                  <p className="text-gray-700">
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
