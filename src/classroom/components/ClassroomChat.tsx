import React, { useEffect, useRef } from 'react'
import { MessageCircle } from 'lucide-react'
import { useChat } from '../chat/hooks/useChat' 
import ChatMessage from '../chat/components/ChatMessage' 
import ChatInput from '../chat/components/ChatInput' 
import UsersList from '../chat/components/UsersList' 

interface ClassroomChatProps {
  classroomId: string
}

const ClassroomChat: React.FC<ClassroomChatProps> = ({ classroomId }) => {
  const { messages, users, isLoading, sendMessage, sendCodeMessage, sendFileMessage } = useChat(classroomId)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-light-gray">Cargando chat...</p>
        </div>
      </div>
    )
  }  return (
    <div className="h-full flex flex-col lg:flex-row gap-2 lg:gap-4">
      {/* Chat principal */}
      <div className="flex-1 flex flex-col bg-dark-card overflow-hidden rounded-lg shadow-lg min-h-0">        {/* Header del chat */}
        <div className="bg-dark-light border-b border-dark-border p-3 lg:p-4 rounded-t-lg flex-shrink-0">
          <div className="flex items-center gap-2 lg:gap-3">
            <div className="bg-primary p-1.5 lg:p-2 rounded-lg">
              <MessageCircle className="w-4 h-4 lg:w-5 lg:h-5 text-light" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="font-semibold text-light text-sm lg:text-base truncate">Chat Privado</h2>
              <p className="text-xs lg:text-sm text-light-gray truncate">
                Sesión de tutoría 1 a 1 - Algoritmos y Estructura de datos
              </p>
            </div>
          </div>
        </div>        {/* Mensajes */}
        <div className="flex-1 min-h-0 overflow-y-auto p-2 lg:p-4 space-y-3 lg:space-y-4 scroll-smooth scrollbar-thin">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <MessageCircle className="w-8 h-8 lg:w-12 lg:h-12 text-light-gray mb-3 lg:mb-4" />
              <h3 className="text-base lg:text-lg font-medium text-light mb-1 lg:mb-2">
                ¡Comienza tu sesión de tutoría!
              </h3>
              <p className="text-sm lg:text-base text-light-gray">
                Pregúntale a tu tutor cualquier duda que tengas
              </p>
            </div>
          ) : (
            <>
              {messages.map((message, index) => {
                const prevMessage = messages[index - 1]
                const showAvatar = !prevMessage || 
                  prevMessage.sender.id !== message.sender.id ||
                  (message.timestamp.getTime() - prevMessage.timestamp.getTime()) > 300000 // 5 minutos

                return (
                  <ChatMessage 
                    key={message.id} 
                    message={message} 
                    showAvatar={showAvatar}
                  />
                )
              })}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>{/* Input para nuevos mensajes */}
        <div className="flex-shrink-0">
          <ChatInput 
            onSendMessage={sendMessage}
            onSendCode={sendCodeMessage}
            onSendFile={sendFileMessage}
            placeholder="Escribe tu pregunta a tu tutor..."
          />
        </div>
      </div>      {/* Lista de usuarios - Solo Desktop */}
      <div className="hidden lg:flex lg:flex-col w-72 bg-dark-light rounded-lg shadow-lg overflow-hidden">
        <UsersList users={users} />
      </div>
    </div>
  )
}

export default ClassroomChat