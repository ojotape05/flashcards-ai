"use client"

import type React from "react"
import { useState } from "react"
import { Modal } from "../ui/Modal"
import { Button } from "../ui/Button"
import { EmailManager } from "./EmailManager"
import { type FileItem } from "../FileGrid/FileCard"

interface ShareModalProps {
  file: FileItem
  isOpen: boolean
  onClose: () => void
  onShare: (emails: string[]) => void
}

export const ShareModal: React.FC<ShareModalProps> = ({ file, isOpen, onClose, onShare }) => {
  const [emails, setEmails] = useState<string[]>(file?.shared_emails || [])
  const [sharedEmails, setSharedEmails] = useState<string[]>(file?.shared_emails || [])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

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
    // setEmails([])
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={`Compartilhar "${file.title}"`} size="md">
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
          <Button type="submit" disabled={ isSubmitting || emails.length === sharedEmails.length }>
            { emails.length < sharedEmails.length ? "Salvar" : "Compartilhar"}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
