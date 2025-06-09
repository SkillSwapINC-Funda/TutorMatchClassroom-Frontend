import React, { useState } from 'react'
import { FileText, Eye, Calendar, Grid3X3, List, ExternalLink, FileSpreadsheet, Presentation, Play } from 'lucide-react'
import MaterialViewer from './MaterialViewer'

interface Material {
  id: string
  title: string
  type: 'pdf' | 'video' | 'document' | 'image' | 'spreadsheet' | 'presentation'
  size: string
  uploadDate: string
  viewUrl: string
  description?: string
}

interface MaterialsTabProps {
  classroomId: string
}

const MaterialsTab: React.FC<MaterialsTabProps> = ({ classroomId }) => {
  // TODO: Use classroomId to fetch materials from API
  console.log('Classroom ID:', classroomId) // Para evitar warning de variable no usada
  
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null)
  const [isViewerOpen, setIsViewerOpen] = useState(false)

  // Función para manejar la vista previa segura de materiales
  const handlePreviewMaterial = (material: Material) => {
    // Verificar si es un tipo de archivo visualizable
    const viewableTypes = ['pdf', 'document', 'presentation', 'spreadsheet']
    
    if (viewableTypes.includes(material.type)) {
      setSelectedMaterial(material)
      setIsViewerOpen(true)
    } else {
      // Para videos y otros tipos, abrir en nueva pestaña
      window.open(material.viewUrl, '_blank', 'noopener,noreferrer')
    }
  }

  const closeViewer = () => {
    setIsViewerOpen(false)
    setSelectedMaterial(null)
  }    // Mock data - en una aplicación real vendría de una API
  const materials: Material[] = [
    {
      id: '1',
      title: 'Introducción a Árboles Binarios.pdf',
      type: 'pdf',
      size: '2.3 MB',
      uploadDate: '2025-06-01',
      viewUrl: '/viewer/material-1.pdf', // URL del PDF
      description: 'Conceptos fundamentales sobre estructuras de datos tipo árbol'
    },
    {
      id: '2',
      title: 'Algoritmos de Búsqueda en Árboles.docx',
      type: 'document',
      size: '1.8 MB',
      uploadDate: '2025-06-03',
      viewUrl: '/viewer/material-2.docx', // URL del documento Word
      description: 'Métodos de búsqueda y navegación en estructuras arbóreas'
    },
    {
      id: '3',
      title: 'Presentación - Tipos de Árboles.pptx',
      type: 'presentation',
      size: '4.2 MB',
      uploadDate: '2025-06-04',
      viewUrl: '/viewer/material-3.pptx', // URL de la presentación
      description: 'Presentación visual de diferentes tipos de árboles binarios'
    },
    {
      id: '4',
      title: 'Ejercicios Prácticos - Datos.xlsx',
      type: 'spreadsheet',
      size: '856 KB',
      uploadDate: '2025-06-04',
      viewUrl: '/viewer/material-4.xlsx', // URL de la hoja de cálculo
      description: 'Conjunto de datos para practicar implementaciones'
    },
    {
      id: '5',
      title: 'Video Explicativo - Recorridos.mp4',
      type: 'video',
      size: '45.2 MB',
      uploadDate: '2025-06-05',
      viewUrl: '/viewer/material-5.mp4', // URL del video
      description: 'Explicación detallada de recorridos preorden, inorden y postorden'
    }
  ]

  const getTypeIcon = (type: Material['type']) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-5 h-5 text-red-500" />
      case 'document':
        return <FileText className="w-5 h-5 text-blue-500" />
      case 'presentation':
        return <Presentation className="w-5 h-5 text-orange-500" />
      case 'spreadsheet':
        return <FileSpreadsheet className="w-5 h-5 text-green-500" />
      case 'video':
        return <Play className="w-5 h-5 text-purple-500" />
      case 'image':
        return <FileText className="w-5 h-5 text-pink-500" />
      default:
        return <FileText className="w-5 h-5 text-light-gray" />
    }
  }
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    })
  }

  const MaterialListView = () => (
    <div className="space-y-4">
      {materials.map((material) => (
        <div
          key={material.id}
          className="bg-dark-light rounded-lg p-4 border border-dark-border hover:border-primary/50 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              {getTypeIcon(material.type)}
              <div className="flex-1">
                <h3 className="font-medium text-light mb-1">{material.title}</h3>
                <div className="flex items-center gap-4 text-sm text-light-gray">
                  <span>{material.size}</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(material.uploadDate)}</span>
                  </div>
                </div>
              </div>
            </div>            <div className="flex items-center gap-2">
              <button 
                onClick={() => handlePreviewMaterial(material)}
                className="flex items-center gap-2 px-3 py-2 text-light-gray hover:text-primary transition-colors rounded-lg hover:bg-dark-card border border-dark-border hover:border-primary/50"
                title="Ver material (solo lectura)"
              >
                <Eye className="w-4 h-4" />
                <span className="text-sm">Ver</span>
              </button>
              <button 
                onClick={() => handlePreviewMaterial(material)}
                className="p-2 text-light-gray hover:text-primary transition-colors rounded-lg hover:bg-dark-card"
                title="Abrir en visor seguro"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  const MaterialGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {materials.map((material) => (
        <div
          key={material.id}
          className="bg-dark-light rounded-lg p-4 border border-dark-border hover:border-primary/50 transition-colors group"
        >
          <div className="flex flex-col h-full">
            {/* Icon and Type */}
            <div className="flex items-center justify-center h-16 mb-3">
              <div className="p-3 rounded-lg bg-dark-card group-hover:bg-dark">
                {getTypeIcon(material.type)}
              </div>
            </div>
            
            {/* Title */}
            <h3 className="font-medium text-light mb-2 text-center line-clamp-2 min-h-[3rem]">
              {material.title}
            </h3>
            
            {/* Metadata */}
            <div className="flex flex-col gap-2 text-sm text-light-gray mb-4 flex-1">
              <div className="text-center">
                <span className="font-medium">{material.size}</span>
              </div>
              <div className="flex items-center justify-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{formatDate(material.uploadDate)}</span>
              </div>
            </div>              {/* Actions */}
            <div className="flex items-center justify-center gap-2 pt-2 border-t border-dark-border">
              <button 
                onClick={() => handlePreviewMaterial(material)}
                className="p-2 text-light-gray hover:text-primary transition-colors rounded-lg hover:bg-dark-card flex-1 flex items-center justify-center"
                title="Ver material (solo lectura)"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button 
                onClick={() => handlePreviewMaterial(material)}
                className="p-2 text-light-gray hover:text-primary transition-colors rounded-lg hover:bg-dark-card flex-1 flex items-center justify-center"
                title="Abrir visor"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>          </div>
        </div>
      ))}
    </div>
  )

  return (
    <>
      <div className="h-full flex flex-col bg-dark-card">
        {/* Header */}
        <div className="p-6 border-b border-dark-border">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold text-light">Materiales del Curso</h2>
            
            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-dark-light rounded-lg p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-primary text-light' 
                    : 'text-light-gray hover:text-light hover:bg-dark-card'
                }`}
                title="Vista de lista"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-primary text-light' 
                    : 'text-light-gray hover:text-light hover:bg-dark-card'
                }`}
                title="Vista de cuadrícula"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
            </div>
          </div>
          <p className="text-light-gray">Recursos y documentos compartidos por tu tutor</p>
        </div>

        {/* Materials List */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
          {materials.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <FileText className="w-12 h-12 text-light-gray mb-4" />
              <h3 className="text-lg font-medium text-light mb-2">
                No hay materiales disponibles
              </h3>
              <p className="text-light-gray">
                Tu tutor aún no ha compartido materiales para esta sesión
              </p>
            </div>
          ) : (
            viewMode === 'list' ? <MaterialListView /> : <MaterialGridView />
          )}
        </div>
      </div>

      {/* Material Viewer Modal */}
      <MaterialViewer
        material={selectedMaterial}
        isOpen={isViewerOpen}
        onClose={closeViewer}
      />
    </>
  )
}

export default MaterialsTab
