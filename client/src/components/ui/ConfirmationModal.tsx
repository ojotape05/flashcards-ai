"use client"

import type React from "react"
import { Modal } from "./Modal"
import { Button } from "./Button"

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  variant?: "default" | "danger"
  icon?: React.ReactNode
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  variant = "default",
  icon,
}) => {
  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="space-y-4">
        {icon && (
          <div className="flex justify-center">
            <div
              className={`
                p-3 rounded-full
                ${variant === "danger" ? "bg-red-100" : "bg-gray-100"}
              `}
            >
              {icon}
            </div>
          </div>
        )}

        <div className="text-center">
          <p className="text-gray-600">{message}</p>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={onClose}>
            {cancelText}
          </Button>
          <Button variant={variant === "danger" ? "primary" : "primary"} onClick={handleConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
