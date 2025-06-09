import React, { useState, useRef, type KeyboardEvent } from 'react'
import { Send, Paperclip, FileText, Code, Smile } from 'lucide-react'
import EmojiPicker from './EmojiPicker'
import CodeModal from './CodeModal'
import FileUpload from './FileUpload'

interface ChatInputProps {
  onSendMessage: (message: string) => void
  onSendCode: (code: string, language: string) => void
  onSendFile: (file: File, type: 'image' | 'video' | 'document') => void
  disabled?: boolean
  placeholder?: string
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  onSendCode,
  onSendFile,
  disabled = false,
  placeholder = "Escribe un mensaje..."
}) => {  
  const [message, setMessage] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [showCodeModal, setShowCodeModal] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message)
      setMessage('')
      
      // Resetear altura del textarea
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }
  const handleEmojiSelect = (emoji: string) => {
    setMessage(prev => prev + emoji)
    setShowEmojiPicker(false)
    
    // Ajustar altura del textarea después de agregar emoji
    if (textareaRef.current) {
      setTimeout(() => {
        textareaRef.current!.style.height = 'auto'
        const scrollHeight = textareaRef.current!.scrollHeight
        const maxHeight = 120
        
        if (scrollHeight <= maxHeight) {
          textareaRef.current!.style.height = `${scrollHeight}px`
          textareaRef.current!.style.overflowY = 'hidden'
        } else {
          textareaRef.current!.style.height = `${maxHeight}px`
          textareaRef.current!.style.overflowY = 'auto'
        }
      }, 0)
    }
  }

  const handleCodeSend = (code: string, language: string) => {
    onSendCode(code, language)
    setShowCodeModal(false)
  }
  const handleFileSelect = (file: File, type: 'image' | 'video' | 'document') => {
    onSendFile(file, type)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
    
    // Auto-resize textarea como WhatsApp
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      const scrollHeight = textareaRef.current.scrollHeight
      const maxHeight = 120 // Máximo 5 líneas aprox
      
      if (scrollHeight <= maxHeight) {
        textareaRef.current.style.height = `${scrollHeight}px`
        textareaRef.current.style.overflowY = 'hidden'
      } else {
        textareaRef.current.style.height = `${maxHeight}px`
        textareaRef.current.style.overflowY = 'auto'
      }
    }
  }
  return (
    <div className="border-t border-dark-border bg-dark-light p-2 lg:p-4">
      <div className="flex items-end gap-2 lg:gap-3">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            className="w-full bg-dark-card border border-dark-border rounded-2xl px-3 py-2.5 lg:px-4 lg:py-3 text-light placeholder-light-gray resize-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors min-h-[40px] lg:min-h-[44px] max-h-[120px] leading-5 text-sm lg:text-base"
            rows={1}
          />
        </div>
          <button
          onClick={handleSend}
          disabled={!message.trim() || disabled}
          className="flex-shrink-0 bg-primary hover:bg-primary-hover disabled:bg-light-gray disabled:hover:bg-light-gray text-light w-10 h-10 lg:w-11 lg:h-11 rounded-full transition-colors disabled:cursor-not-allowed flex items-center justify-center mb-1"
        >
          <Send className="w-4 h-4 lg:w-5 lg:h-5" />
        </button>
      </div>      {/* Toolbar con iconos */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 lg:gap-6 mt-2 lg:mt-3 pt-2 lg:pt-3 border-t border-dark-border/50 relative">
        <FileUpload
          onFileSelect={handleFileSelect}
          accept="*/*"
          fileType="document"
        >
          <button
            type="button"
            className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 text-light-gray hover:text-primary transition-colors"
            title="Adjuntar archivo"
          >
            <Paperclip className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </FileUpload>
        
        <FileUpload
          onFileSelect={handleFileSelect}
          accept=".pdf,.doc,.docx,.txt,.ppt,.pptx,.xls,.xlsx"
          fileType="document"
        >
          <button
            type="button"
            className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 text-light-gray hover:text-primary transition-colors"
            title="Documentos"
          >
            <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </FileUpload>
          <button
          type="button"
          onClick={() => setShowCodeModal(true)}
          className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 text-light-gray hover:text-primary transition-colors"
          title="Código"
        >
          <Code className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        
        <button
          type="button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 text-light-gray hover:text-primary transition-colors"
          title="Emojis"
        >
          <Smile className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Modales y pickers */}
        <EmojiPicker
          isOpen={showEmojiPicker}
          onEmojiSelect={handleEmojiSelect}
          onClose={() => setShowEmojiPicker(false)}
        />
      </div>

      <CodeModal
        isOpen={showCodeModal}
        onClose={() => setShowCodeModal(false)}
        onSendCode={handleCodeSend}
      />
    </div>
  )
}

export default ChatInput