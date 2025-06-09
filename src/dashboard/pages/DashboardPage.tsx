import React, { useState, useEffect } from 'react';
import { Filter } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../../public/components/Footer';
import SearchBar from '../components/ui/SearchBar';
import CourseCard from '../components/CourseCard';
import type { Course } from '../types/Courses';
import { CourseService } from '../services/CourseService';

const DashboardPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const coursesData = await CourseService.getCourses();
        setCourses(coursesData);
      } catch (error) {
        console.error('Error loading courses:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  const handleEnterClassroom = async (courseId: number) => {
    await CourseService.enterClassroom(courseId);
  };

  const handleOpenChat = async (courseId: number) => {
    await CourseService.openChat(courseId);
  };

  const handleOpenMaterials = async (courseId: number) => {
    await CourseService.openMaterials(courseId);
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.tutor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-light">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark flex flex-col">
      <Header notificationCount={1} />

      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-light mb-8">Mis Cursos en Classroom</h1>
        
        <div className="flex items-center space-x-4 mb-8">
          <SearchBar
            placeholder="Buscar tutorías..."
            value={searchTerm}
            onChange={setSearchTerm}
          />
          <button className="flex items-center space-x-2 bg-dark-light border border-dark-border text-light px-4 py-2 rounded-lg hover:border-primary transition-colors">
            <Filter className="w-5 h-5" />
            <span>Todas las tutorías</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onEnterClassroom={handleEnterClassroom}
              onOpenChat={handleOpenChat}
              onOpenMaterials={handleOpenMaterials}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DashboardPage;