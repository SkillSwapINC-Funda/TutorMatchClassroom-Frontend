import React from 'react';
import { FileText, MessageCircle } from 'lucide-react';
import type { Course } from '../types/Courses';
import NotificationBadge from './ui/NotificationBadge';

interface CourseCardProps {
  course: Course;
  onEnterClassroom?: (courseId: number) => void;
  onOpenChat?: (courseId: number) => void;
  onOpenMaterials?: (courseId: number) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onEnterClassroom,
  onOpenChat,
  onOpenMaterials
}) => {
  return (
    <div className="bg-dark-card rounded-lg overflow-hidden shadow-lg">
      {/* Course Image Placeholder */}
      <div className="h-32 bg-gray-200 flex items-center justify-center relative">
        <div className="w-12 h-12 bg-gray-300 rounded flex items-center justify-center">
          <FileText className="w-6 h-6 text-gray-500" />
        </div>
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <span className={`${course.statusColor} text-light text-xs px-2 py-1 rounded font-medium`}>
            {course.status}
          </span>
        </div>
      </div>
      
      {/* Course Content */}
      <div className="p-4">
        <h3 className="text-light font-semibold text-base mb-2 leading-tight">
          {course.title}
        </h3>
        
        <p className="text-light text-sm mb-1">Tutor: {course.tutor}</p>
        <p className="text-gray-500 text-sm mb-4 flex items-center">
          <span className="inline-block w-3 h-3 bg-gray-400 rounded-full mr-2"></span>
          {course.nextSession}
        </p>
        
        <button 
          onClick={() => onEnterClassroom?.(course.id)}
          className="w-full bg-primary hover:bg-primary-hover text-light py-2.5 px-4 rounded text-sm font-medium transition-colors mb-4"
        >
          Entrar al Classroom
        </button>
        
        {/* Action Buttons */}
        <div className="flex justify-between">
          <button 
            onClick={() => onOpenChat?.(course.id)}
            className="flex items-center space-x-2 text-light text-sm bg-dark-light px-3 py-2 rounded hover:bg-dark transition-colors relative"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat</span>
            <NotificationBadge count={course.chatNotification} />
          </button>
          
          <button 
            onClick={() => onOpenMaterials?.(course.id)}
            className="flex items-center space-x-2 text-light text-sm bg-dark-light px-3 py-2 rounded hover:bg-dark transition-colors relative"
          >
            <FileText className="w-4 h-4" />
            <span>Materiales</span>
            <NotificationBadge count={course.materialsNotification} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;