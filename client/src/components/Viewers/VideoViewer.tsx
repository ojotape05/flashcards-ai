"use client"

import type React from "react"
import { Button } from "../ui/Button"
import { XIcon, DownloadIcon, Share2Icon } from "../ui/Icons"

interface VideoViewerProps {
  fileName: string
  fileSize?: string
  onClose: () => void
  onShare?: () => void
}

export const VideoViewer: React.FC<VideoViewerProps> = ({ fileName, fileSize, onClose, onShare }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-4">
        <div className="flex items-center justify-between text-white">
          <div>
            <h1 className="text-lg font-semibold">{fileName}</h1>
            {fileSize && <p className="text-sm text-gray-300">{fileSize}</p>}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onShare} className="text-white hover:bg-white/20">
              <Share2Icon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <DownloadIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
              <XIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Video Player */}
      <div className="flex items-center justify-center h-full">
        <video controls autoPlay className="max-w-full max-h-full" poster="/placeholder.svg?height=400&width=600">
          <source src="/placeholder-video.mp4" type="video/mp4" />
          <p className="text-white">Seu navegador não suporta o elemento de vídeo.</p>
        </video>
      </div>

      {/* Controls overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <div className="text-center text-white text-sm">
          Use os controles do player para reproduzir, pausar e ajustar o volume
        </div>
      </div>
    </div>
  )
}
