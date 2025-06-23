"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { Switch } from "../ui/Switch"
import { EmailManager } from "./EmailManager"

interface NewCollectionFormProps {
  onSubmit: (data: { title: string; emails: string[]; isShared: boolean }) => void
  onCancel: () => void
}

export const NewCollectionForm: React.FC<NewCollectionFormProps> = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState("")
  const [isShared, setIsShared] = useState(false)
  const [emails, setEmails] = useState<string[]>([])
  const [titleError, setTitleError] = useState("")
  const [emailsError, setEmailsError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
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

    if (hasErrors) {
      return
    }

    onSubmit({
      title: title.trim(),
      emails: isShared ? emails : [],
      isShared,
    })
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title Input */}
      <div>
        <Input
          label="Título"
          type="text"
          placeholder="Digite o título da coleção"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
            if (titleError) setTitleError("")
          }}
          error={titleError}
          required
        />
      </div>

      {/* Share Toggle */}
      <div className="space-y-4">
        <Switch checked={isShared} onChange={handleShareToggle} label="Compartilhar coleção" />
        {isShared && (
          <EmailManager
            emails={emails}
            onEmailsChange={handleEmailsChange}
            placeholder="Digite um email para compartilhar"
            label="Emails"
            error={emailsError}
            required
          />
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Criar Coleção</Button>
      </div>
    </form>
  )
}

// Add PlusIcon to the existing icons
const PlusIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
)
