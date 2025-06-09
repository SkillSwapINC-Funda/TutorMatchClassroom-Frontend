import React from 'react'
import { X, ExternalLink, FileText, FileSpreadsheet, Presentation } from 'lucide-react'

interface Material {
  id: string
  title: string
  type: 'pdf' | 'video' | 'document' | 'image' | 'spreadsheet' | 'presentation'
  size: string
  uploadDate: string
  viewUrl: string
  description?: string
}

interface MaterialViewerProps {
  material: Material | null
  isOpen: boolean
  onClose: () => void
}

const MaterialViewer: React.FC<MaterialViewerProps> = ({ material, isOpen, onClose }) => {
  if (!isOpen || !material) return null

  // Verificar si el tipo de archivo es compatible con visualización
  const isViewable = ['pdf', 'document', 'presentation', 'spreadsheet'].includes(material.type)

  const getFileIcon = (type: Material['type']) => {
    switch (type) {
      case 'pdf':
      case 'document':
        return <FileText className="w-6 h-6 text-red-500" />
      case 'spreadsheet':
        return <FileSpreadsheet className="w-6 h-6 text-green-500" />
      case 'presentation':
        return <Presentation className="w-6 h-6 text-orange-500" />
      default:
        return <FileText className="w-6 h-6 text-light-gray" />
    }
  }

  const getViewerUrl = (material: Material) => {
    // Para PDFs, usar el visor nativo del navegador
    if (material.type === 'pdf') {
      return `${material.viewUrl}#toolbar=0&navpanes=0&view=FitH`
    }
    
    // Para documentos de Office, usar Office Online Viewer
    if (['document', 'presentation', 'spreadsheet'].includes(material.type)) {
      // En una aplicación real, estos serían URLs de tu servidor que sirven los documentos
      // convertidos o un servicio como Google Docs Viewer o Office Online
      return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(material.viewUrl)}`
    }
    
    return material.viewUrl
  }

  if (!isViewable) {
    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
        <div className="bg-dark-card border border-dark-border rounded-lg shadow-2xl w-full max-w-md">
          <div className="p-6 text-center">
            {getFileIcon(material.type)}
            <h3 className="text-lg font-semibold text-light mt-4 mb-2">
              Tipo de archivo no compatible
            </h3>
            <p className="text-light-gray mb-6">
              Este tipo de archivo no se puede visualizar directamente. 
              Los formatos compatibles son: PDF, Word, PowerPoint y Excel.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={onClose}
                className="px-4 py-2 text-light-gray hover:text-light transition-colors"
              >
                Cerrar
              </button>
              <button
                onClick={() => window.open(material.viewUrl, '_blank')}
                className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-light rounded transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Abrir externa
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-dark-card border border-dark-border rounded-lg shadow-2xl w-full h-full max-w-7xl max-h-[95vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-dark-border flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            {getFileIcon(material.type)}
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-light truncate">{material.title}</h3>
              <p className="text-sm text-light-gray">
                {material.size} • Solo lectura
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => window.open(material.viewUrl, '_blank')}
              className="p-2 text-light-gray hover:text-light hover:bg-dark-light rounded transition-colors"
              title="Abrir en nueva pestaña"
            >
              <ExternalLink className="w-5 h-5" />
            </button>
            
            <button
              onClick={onClose}
              className="p-2 text-light-gray hover:text-light hover:bg-dark-light rounded transition-colors"
              title="Cerrar visor"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Viewer Content */}
        <div className="flex-1 min-h-0 bg-light/5 relative">
          <iframe
            src={getViewerUrl(material)}
            className="w-full h-full border-0"
            title={`Visor de ${material.title}`}
            sandbox="allow-scripts allow-same-origin allow-popups"
            loading="lazy"
          />
          
          {/* Loading overlay */}
          <div className="absolute inset-0 bg-dark-card flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-light-gray">Cargando documento...</p>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-3 border-t border-dark-border bg-dark-light flex-shrink-0">
          <div className="flex items-center justify-between text-sm">
            <span className="text-light-gray">
              Visualización protegida - No se permite descarga
            </span>
            <span className="text-light-gray">
              {material.description}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MaterialViewer
