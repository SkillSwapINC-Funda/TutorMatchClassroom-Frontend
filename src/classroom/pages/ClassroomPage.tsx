import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Video, Phone, MessageCircle, FileText, Info } from 'lucide-react'
import ClassroomChat from '../components/ChatTab'
import MaterialsTab from '../components/MaterialsTab'
import InfoTab from '../components/InfoTab'
import Tabs from '../components/Tabs'
import type { Tab } from '../components/Tabs'
import Footer from '../../public/components/Footer'

const ClassroomPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const classroomId = id || '1'
  const [activeTab, setActiveTab] = useState('chat')

  const tabs: Tab[] = [
    {
      id: 'chat',
      label: 'Chat',
      icon: <MessageCircle className="w-5 h-5" />,
      content: <ClassroomChat classroomId={classroomId} />
    },
    {
      id: 'materials',
      label: 'Materiales',
      icon: <FileText className="w-5 h-5" />,
      content: <MaterialsTab classroomId={classroomId} />
    },
    {
      id: 'info',
      label: 'Información',
      icon: <Info className="w-5 h-5" />,
      content: <InfoTab classroomId={classroomId} />
    }
  ]
  return (
    <div className="h-screen bg-dark flex flex-col">      {/* Header */}
      <header className="bg-dark-light border-b border-dark-border flex-shrink-0">
        <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
              <Link 
                to="/dashboard"
                className="flex items-center gap-1 sm:gap-2 text-light-gray hover:text-light transition-colors text-sm sm:text-base"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Volver</span>
              </Link>
              
              <div className="h-4 sm:h-6 w-px bg-dark-border"></div>
              
              <div className="flex-1 min-w-0">
                <h1 className="text-sm sm:text-lg lg:text-xl font-semibold text-light truncate">
                  Algoritmos y Estructura de datos: Árboles Binarios
                </h1>
                <p className="text-xs sm:text-sm text-light-gray truncate">
                  Tutor: Ana Martínez
                </p>
              </div>
            </div>            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end">
              <button 
                className="flex items-center justify-center bg-dark-light hover:bg-dark-border text-light p-2 sm:p-2.5 rounded-full transition-colors border border-dark-border hover:border-light-gray"
                title="Llamada de audio"
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              
              <button 
                className="flex items-center justify-center bg-primary hover:bg-primary-hover text-light p-2 sm:p-2.5 rounded-full transition-colors"
                title="Videollamada"
              >
                <Video className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>{/* Contenido principal */}
      <main className="flex-1 min-h-0 p-4">
        <div className="h-full">
          <Tabs 
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            className="rounded-lg shadow-lg overflow-hidden"
          />
        </div>
      </main>

      {/* Footer */}
      <div className="flex-shrink-0">
        <Footer />
      </div>
    </div>
  )
}

export default ClassroomPage