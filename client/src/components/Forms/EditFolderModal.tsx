"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Modal } from "../ui/Modal"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { Switch } from "../ui/Switch"
import { EmailManager } from "./EmailManager"

interface EditFolderModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: { title: string; emails: string[]; isShared: boolean; isStarred: boolean }) => void
  folderData: {
    title: string
    emails: string[]
    isShared: boolean
    isStarred: boolean
  }
}

export const EditFolderModal: React.FC<EditFolderModalProps> = ({ isOpen, onClose, onSave, folderData }) => {
  const [title, setTitle] = useState("")
  const [isShared, setIsShared] = useState(false)
  const [isStarred, setIsStarred] = useState(false)
  const [emails, setEmails] = useState<string[]>([])
  const [titleError, setTitleError] = useState("")
  const [emailsError, setEmailsError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize form with folder data when modal opens
  useEffect(() => {
    if (isOpen && folderData) {
      setTitle(folderData.title)
      setIsShared(folderData.isShared)
      setIsStarred(folderData.isStarred)
      setEmails(folderData.emails)
      setTitleError("")
      setEmailsError("")
    }
  }, [isOpen, folderData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    let hasErrors = false

    // Validate title
    if (!title.trim()) {
      setTitleError("O título é obrigatório")
      hasErrors = true
    }

    // Validate emails if sharing is enabled
    if (isShared && emails.length === 0) {
      setEmailsError("Adicione pelo menos um email para compartilhar")
      hasErrors = true
    }

    // Don't submit if there are errors
    if (hasErrors) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      onSave({
        title: title.trim(),
        emails: isShared ? emails : [],
        isShared,
        isStarred,
      })

      handleClose()
    } catch (error) {
      console.error("Error saving folder:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEmailsChange = (newEmails: string[]) => {
    setEmails(newEmails)
    // Clear error when emails are added
    if (emailsError && newEmails.length > 0) {
      setEmailsError("")
    }
  }

  const handleShareToggle = (checked: boolean) => {
    setIsShared(checked)
    // Clear emails error when sharing is disabled
    if (!checked && emailsError) {
      setEmailsError("")
    }
    // Clear emails when sharing is disabled
    if (!checked) {
      setEmails([])
    }
  }

  const handleClose = () => {
    // Reset form state
    setTitle("")
    setIsShared(false)
    setIsStarred(false)
    setEmails([])
    setTitleError("")
    setEmailsError("")
    setIsSubmitting(false)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Editar Pasta" size="md">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Input */}
        <div>
          <Input
            label="Nome da Pasta"
            type="text"
            placeholder="Digite o nome da pasta"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
              if (titleError) setTitleError("")
            }}
            error={titleError}
            required
          />
        </div>

        {/* Starred Toggle */}
        <div>
          <Switch checked={isStarred} onChange={setIsStarred} label="Adicionar aos favoritos" />
        </div>

        {/* Share Toggle */}
        <div className="space-y-4">
          <Switch checked={isShared} onChange={handleShareToggle} label="Compartilhar pasta" />

          {isShared && (
            <div>
              <p className="text-sm text-gray-600 mb-3">
                Pessoas com acesso a esta pasta poderão visualizar todos os arquivos dentro dela.
              </p>
              <EmailManager
                emails={emails}
                onEmailsChange={handleEmailsChange}
                placeholder="Digite um email para compartilhar"
                label="Pessoas com acesso"
                required
                error={emailsError}
              />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <Button type="button" variant="outline" onClick={handleClose} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
