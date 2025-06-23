"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { XIcon, MailIcon, PlusIcon } from "../ui/Icons"

interface EmailManagerProps {
  emails: string[]
  onEmailsChange: (emails: string[]) => void
  placeholder?: string
  label?: string
  required?: boolean
  error?: string
}

export const EmailManager: React.FC<EmailManagerProps> = ({
  emails,
  onEmailsChange,
  placeholder = "Digite um email",
  label = "Emails",
  required = false,
  error,
}) => {
  const [currentEmail, setCurrentEmail] = useState("")
  const [emailError, setEmailError] = useState("")

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

    onEmailsChange([...emails, trimmedEmail])
    setCurrentEmail("")
    setEmailError("")
  }

  const handleRemoveEmail = (emailToRemove: string) => {
    onEmailsChange(emails.filter((email) => email !== emailToRemove))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddEmail()
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            type="email"
            placeholder={placeholder}
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
          <label className="block text-sm font-medium text-gray-700">{label} adicionados:</label>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {emails.map((email, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2 text-sm">
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

      {/* Error message for required validation */}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {/* Helper text when required but no error */}
      {required && emails.length === 0 && !error && (
        <p className="text-sm text-gray-500">Adicione pelo menos um email para compartilhar</p>
      )}
    </div>
  )
}
