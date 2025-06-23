"use client"

import type React from "react"
import { useState } from "react"
import { Modal } from "../ui/Modal"
import { Button } from "../ui/Button"
import { EmailManager } from "./EmailManager"

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  onShare: (emails: string[]) => void
  fileName: string
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, onShare, fileName }) => {
  const [emails, setEmails] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (emails.length === 0) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      onShare(emails)
      handleClose()
    } catch (error) {
      console.error("Error sharing file:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setEmails([])
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={`Compartilhar "${fileName}"`} size="md">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <p className="text-sm text-gray-600 mb-4">
            Adicione os emails das pessoas com quem você deseja compartilhar este arquivo.
          </p>

          <EmailManager
            emails={emails}
            onEmailsChange={setEmails}
            placeholder="Digite um email para compartilhar"
            label="Pessoas"
            required
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <Button type="button" variant="outline" onClick={handleClose} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button type="submit" disabled={emails.length === 0 || isSubmitting}>
            {isSubmitting ? "Compartilhando..." : "Compartilhar"}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
