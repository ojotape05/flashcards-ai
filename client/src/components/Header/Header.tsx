"use client"

import type React from "react"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { SearchIcon, FilterIcon, SortAscIcon, GridIcon, BellIcon } from "../ui/Icons"

interface HeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}

export const Header: React.FC<HeaderProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative w-80">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Buscar arquivos e pastas..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
            />
          </div>
          <Button variant="outline" size="sm">
            <FilterIcon className="h-4 w-4 mr-2" />
            Filtros
          </Button>
          <Button variant="outline" size="sm">
            <SortAscIcon className="h-4 w-4 mr-2" />
            Ordenar
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <GridIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <BellIcon className="h-4 w-4" />
          </Button>
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-semibold">U</span>
          </div>
        </div>
      </div>
    </header>
  )
}
