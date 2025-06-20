"use client"

import type React from "react"
import { NavItem } from "./NavItem"
import { FolderItem } from "./FolderItem"
import { Button } from "../ui/Button"
import { GridIcon, StarIcon, Share2Icon, VideoIcon, FileTextIcon, FolderIcon } from "../ui/Icons"

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">FileManager</h1>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        <NavItem
          icon={<GridIcon className="h-5 w-5" />}
          active={activeSection === "all"}
          onClick={() => onSectionChange("all")}
        >
          Todos os arquivos
        </NavItem>
        <NavItem
          icon={<StarIcon className="h-5 w-5" />}
          count={12}
          active={activeSection === "starred"}
          onClick={() => onSectionChange("starred")}
        >
          Favoritos
        </NavItem>
        <NavItem
          icon={<Share2Icon className="h-5 w-5" />}
          count={8}
          active={activeSection === "shared"}
          onClick={() => onSectionChange("shared")}
        >
          Compartilhados
        </NavItem>
        <NavItem
          icon={<VideoIcon className="h-5 w-5" />}
          count={24}
          active={activeSection === "videos"}
          onClick={() => onSectionChange("videos")}
        >
          Vídeos
        </NavItem>
        <NavItem
          icon={<FileTextIcon className="h-5 w-5" />}
          count={156}
          active={activeSection === "documents"}
          onClick={() => onSectionChange("documents")}
        >
          Documentos
        </NavItem>

        <div className="pt-6">
          <div className="px-3 mb-3">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Pastas</h3>
          </div>
          <div className="space-y-1">
            <FolderItem icon={<FolderIcon className="h-4 w-4 text-blue-500" />} count={15}>
              Projetos
            </FolderItem>
            <FolderItem icon={<FolderIcon className="h-4 w-4 text-green-500" />} count={8}>
              Apresentações
            </FolderItem>
            <FolderItem icon={<FolderIcon className="h-4 w-4 text-purple-500" />} count={23}>
              Recursos
            </FolderItem>
            <FolderItem icon={<FolderIcon className="h-4 w-4 text-orange-500" />} count={12}>
              Arquivos
            </FolderItem>
          </div>
        </div>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white">
          <h4 className="font-semibold text-sm mb-1">Upgrade para Pro</h4>
          <p className="text-xs opacity-90 mb-3">Obtenha mais espaço e recursos</p>
          <Button size="sm" className="bg-white text-blue-600 hover:bg-gray-100 text-xs">
            Upgrade
          </Button>
        </div>
      </div>
    </div>
  )
}
