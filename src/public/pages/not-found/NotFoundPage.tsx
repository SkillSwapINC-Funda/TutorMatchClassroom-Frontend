import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-dark text-light flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Página no encontrada</h2>
        <p className="text-light-gray mb-8">La página que buscas no existe.</p>
        <Link 
          to="/dashboard" 
          className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg transition-colors"
        >
          Volver al Dashboard
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage