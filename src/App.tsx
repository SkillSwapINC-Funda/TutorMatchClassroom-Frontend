import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DashboardPage from './dashboard/pages/DashboardPage'
import NotFoundPage from './public/pages/not-found/NotFoundPage'
import ClassroomPage from './classroom/pages/ClassroomPage'

function App() {
  return (
    <div className="min-h-screen bg-dark">
      <Router>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/classroom/:id" element={<ClassroomPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App