import React from 'react'
import { Clock, Calendar, Users } from 'lucide-react'

interface InfoTabProps {
  classroomId: string
}

const InfoTab: React.FC<InfoTabProps> = ({ classroomId }) => {
  // TODO: Use classroomId to fetch session info from API
  console.log('Classroom ID:', classroomId) // Para evitar warning de variable no usada
  
  // Mock data - en una aplicación real vendría de una API
  const tutorshipInfo = {
    title: 'Complejidad Algorítmica: Asesorías',
    description: 'Comprenderla nos permite evaluar la eficiencia de nuestros algoritmos y tomar decisiones informadas al seleccionar las mejores herramientas para nuestros proyectos.',
    startDate: '6 de mayo de 2025',
    endDate: '5 de julio de 2025',
    sessions: {
      completed: 2,
      total: 8
    },
    type: 'Personalizada (1 a 1)',
    topics: [
      'Introducción a la Complejidad Algorítmica',
      'Análisis de Algoritmos Recursivos',
      'Algoritmos de Ordenamiento',
      'Algoritmos de Búsqueda',
      'Estructuras de Datos Avanzadas',
      'Algoritmos Voraces (Greedy)',
      'Programación Dinámica',
      'Algoritmos de Grafos'
    ]
  }

  const tutor = {
    name: 'Carlos Domínguez',
    avatar: 'CD',
    experience: 'Ingeniero de Software con más de 8 años de experiencia. Especialista en algoritmos y estructuras de datos. Profesor universitario y mentor de estudiantes de Ingeniería.',
    role: 'Tutor'
  }

  const student = {
    name: 'María García',
    avatar: 'MG',
    description: 'Estudiante de Ingeniería de Software, cursando el 6to semestre. Interesada en algoritmos y desarrollo web.',
    role: 'Estudiante'
  }
  return (
    <div className="h-full overflow-y-auto bg-dark-card scrollbar-thin">
      <div className="p-6">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          {/* Columna Izquierda - Información Principal */}
          <div className="xl:col-span-2 space-y-6">
            
            {/* Información de la Tutoría */}
            <div className="bg-dark-light rounded-lg p-6 border border-dark-border">
              <h2 className="text-xl font-semibold text-light mb-4">
                Información de la Tutoría
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-light text-lg mb-2">{tutorshipInfo.title}</h3>
                  <p className="text-light-gray leading-relaxed">{tutorshipInfo.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-4 h-4 text-light-gray mt-1" />
                      <div>
                        <p className="text-sm text-light-gray">Fecha de inicio</p>
                        <p className="text-light font-medium">{tutorshipInfo.startDate}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Calendar className="w-4 h-4 text-light-gray mt-1" />
                      <div>
                        <p className="text-sm text-light-gray">Fecha de finalización</p>
                        <p className="text-light font-medium">{tutorshipInfo.endDate}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Clock className="w-4 h-4 text-light-gray mt-1" />
                      <div>
                        <p className="text-sm text-light-gray">Sesiones</p>
                        <p className="text-light font-medium">
                          {tutorshipInfo.sessions.completed} de {tutorshipInfo.sessions.total} completadas
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Users className="w-4 h-4 text-light-gray mt-1" />
                      <div>
                        <p className="text-sm text-light-gray">Tipo de tutoría</p>
                        <p className="text-light font-medium">{tutorshipInfo.type}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Temario de la Tutoría */}
            <div className="bg-dark-light rounded-lg p-6 border border-dark-border">
              <h2 className="text-xl font-semibold text-light mb-4">
                Temario de la Tutoría
              </h2>
              
              <div className="space-y-3">
                {tutorshipInfo.topics.map((topic, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-light-gray/20 text-light-gray rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className={`flex text-light-gray items-center gap-2`}>
                        {topic}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Columna Derecha - Perfiles */}
          <div className="space-y-6">
            
            {/* Información del Tutor */}
            <div className="bg-dark-light rounded-lg p-6 border border-dark-border">
              <h2 className="text-xl font-semibold text-light mb-4">
                Tutor
              </h2>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-light rounded-full flex items-center justify-center text-dark font-bold text-xl mx-auto mb-4">
                  {tutor.avatar}
                </div>
                
                <div>
                  <h3 className="font-semibold text-light text-lg mb-1">{tutor.name}</h3>
                  <span className="inline-block px-3 py-1 bg-primary text-light text-xs rounded-full mb-3">
                    {tutor.role}
                  </span>
                  
                  <p className="text-light-gray leading-relaxed text-sm text-left">
                    {tutor.experience}
                  </p>
                </div>
              </div>
            </div>

            {/* Información del Estudiante */}
            <div className="bg-dark-light rounded-lg p-6 border border-dark-border">
              <h2 className="text-xl font-semibold text-light mb-4">
                Estudiante
              </h2>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-light rounded-full flex items-center justify-center text-dark font-bold text-xl mx-auto mb-4">
                  {student.avatar}
                </div>
                
                <div>
                  <h3 className="font-semibold text-light text-lg mb-1">{student.name}</h3>
                  <span className="inline-block px-3 py-1 bg-blue-600 text-light text-xs rounded-full mb-3">
                    {student.role}
                  </span>
                  
                  <p className="text-light-gray leading-relaxed text-sm text-left">
                    {student.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfoTab
