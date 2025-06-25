"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "../ui/Button"
import { XIcon, DownloadIcon, Share2Icon, CopyIcon } from "../ui/Icons"

interface SpreadsheetViewerProps {
  fileName: string
  fileSize?: string
  onClose: () => void
  onShare?: () => void
}

interface CellData {
  value: string | number
  formula?: string
}

export const SpreadsheetViewer: React.FC<SpreadsheetViewerProps> = ({ fileName, fileSize, onClose, onShare }) => {
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null)
  const [selectedRange, setSelectedRange] = useState<{
    start: { row: number; col: number }
    end: { row: number; col: number }
  } | null>(null)

  // Mock spreadsheet data
  const mockData: CellData[][] = Array.from({ length: 20 }, (_, rowIndex) =>
    Array.from({ length: 10 }, (_, colIndex) => {
      if (rowIndex === 0) {
        return { value: `Coluna ${String.fromCharCode(65 + colIndex)}` }
      }
      if (colIndex === 0) {
        return { value: `Item ${rowIndex}` }
      }
      return { value: Math.floor(Math.random() * 1000) }
    }),
  )

  const getColumnLabel = (index: number) => String.fromCharCode(65 + index)

  const handleCellClick = (row: number, col: number) => {
    setSelectedCell({ row, col })
    setSelectedRange(null)
  }

  const handleCopyCell = () => {
    if (selectedCell) {
      const cellValue = mockData[selectedCell.row][selectedCell.col].value
      navigator.clipboard.writeText(String(cellValue))
    }
  }

  const handleCopyRange = () => {
    if (selectedRange) {
      const { start, end } = selectedRange
      const rangeData = []
      for (let row = start.row; row <= end.row; row++) {
        const rowData = []
        for (let col = start.col; col <= end.col; col++) {
          rowData.push(mockData[row][col].value)
        }
        rangeData.push(rowData.join("\t"))
      }
      navigator.clipboard.writeText(rangeData.join("\n"))
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">{fileName}</h1>
            {fileSize && <p className="text-sm text-gray-500">{fileSize}</p>}
          </div>
          <div className="flex items-center gap-2">
            {selectedCell && (
              <Button variant="outline" size="sm" onClick={handleCopyCell}>
                <CopyIcon className="h-4 w-4 mr-2" />
                Copiar Célula
              </Button>
            )}
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

      {/* Cell Info */}
      {selectedCell && (
        <div className="bg-gray-50 border-b border-gray-200 p-2">
          <div className="flex items-center gap-4 text-sm">
            <span className="font-medium">
              Célula: {getColumnLabel(selectedCell.col)}
              {selectedCell.row + 1}
            </span>
            <span>Valor: {mockData[selectedCell.row][selectedCell.col].value}</span>
          </div>
        </div>
      )}

      {/* Spreadsheet */}
      <div className="flex-1 overflow-auto">
        <div className="inline-block min-w-full">
          <table className="border-collapse">
            <thead>
              <tr>
                <th className="w-12 h-8 bg-gray-100 border border-gray-300 text-xs font-medium text-gray-600"></th>
                {Array.from({ length: 10 }, (_, index) => (
                  <th
                    key={index}
                    className="w-24 h-8 bg-gray-100 border border-gray-300 text-xs font-medium text-gray-600"
                  >
                    {getColumnLabel(index)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td className="w-12 h-8 bg-gray-100 border border-gray-300 text-xs font-medium text-gray-600 text-center">
                    {rowIndex + 1}
                  </td>
                  {row.map((cell, colIndex) => (
                    <td
                      key={colIndex}
                      className={`w-24 h-8 border border-gray-300 text-xs px-2 cursor-pointer hover:bg-blue-50 ${
                        selectedCell?.row === rowIndex && selectedCell?.col === colIndex
                          ? "bg-blue-100 border-blue-500"
                          : ""
                      }`}
                      onClick={() => handleCellClick(rowIndex, colIndex)}
                    >
                      {cell.value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
