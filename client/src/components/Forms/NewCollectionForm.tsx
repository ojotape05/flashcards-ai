"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { Switch } from "../ui/Switch"
import { XIcon, MailIcon } from "../ui/Icons"

interface NewCollectionFormProps {
  onSubmit: (data: { title: string; emails: string[]; isShared: boolean }) => void
  onCancel: () => void
}

export const NewCollectionForm: React.FC<NewCollectionFormProps> = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState("")
  const [isShared, setIsShared] = useState(false)
  const [emails, setEmails] = useState<string[]>([])
  const [currentEmail, setCurrentEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [titleError, setTitleError] = useState("")

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleAddEmail = () => {
    const trimmedEmail = currentEmail.trim()

    if (!trimmedEmail) {
      setEmailError("Digite um email")
      return
    }

    if (!validateEmail(trimmedEmail)) {
      setEmailError("Digite um email válido")
      return
    }

    if (emails.includes(trimmedEmail)) {
      setEmailError("Este email já foi adicionado")
      return
    }

    setEmails([...emails, trimmedEmail])
    setCurrentEmail("")
    setEmailError("")
  }

  const handleRemoveEmail = (emailToRemove: string) => {
    setEmails(emails.filter((email) => email !== emailToRemove))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddEmail()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate title
    if (!title.trim()) {
      setTitleError("O título é obrigatório")
      return
    }

    // Validate emails if sharing is enabled
    if (isShared && emails.length === 0) {
      setEmailError("Adicione pelo menos um email para compartilhar")
      return
    }

    onSubmit({
      title: title.trim(),
      emails: isShared ? emails : [],
      isShared,
    })
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
        <Switch checked={isShared} onChange={setIsShared} label="Compartilhar coleção" />

        {isShared && (
          <div className="space-y-3">
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="Digite um email para compartilhar"
                  value={currentEmail}
                  onChange={(e) => {
                    setCurrentEmail(e.target.value)
                    if (emailError) setEmailError("")
                  }}
                  onKeyPress={handleKeyPress}
                  error={emailError}
                />
              </div>
              <Button type="button" onClick={handleAddEmail} variant="outline" className="px-3">
                <PlusIcon className="h-4 w-4" />
              </Button>
            </div>

            {/* Email List */}
            {emails.length > 0 && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Emails adicionados:</label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {emails.map((email, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2 text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <MailIcon className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-700">{email}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveEmail(email)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-md hover:bg-gray-200"
                      >
                        <XIcon className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
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
