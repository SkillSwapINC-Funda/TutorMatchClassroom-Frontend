import type { Course } from "../types/Courses";

export class CourseService {
  static async getCourses(): Promise<Course[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockCourses: Course[] = [
          {
            id: 1,
            title: "Algoritmos y Estructura de datos: Árboles Binarios",
            tutor: "Ana Martínez",
            nextSession: "Próxima sesión: 15 de abril de 2024, 15:00",
            status: "En curso",
            statusColor: "bg-green-500",
            chatNotification: 1,
            materialsNotification: 0
          },
          {
            id: 2,
            title: "Diseño de Base de Datos: MongoDB",
            tutor: "Roberto Sánchez",
            nextSession: "Completado el 20 de marzo de 2024, 09:00",
            status: "Completado",
            statusColor: "bg-blue-500",
            chatNotification: 0,
            materialsNotification: 0
          },
          {
            id: 3,
            title: "Complejidad Algorítmica: Asesorías",
            tutor: "Carlos Domínguez",
            nextSession: "Próxima sesión: 12 de abril de 2024, 17:30",
            status: "En curso",
            statusColor: "bg-green-500",
            chatNotification: 0,
            materialsNotification: 1
          }
        ];
        resolve(mockCourses);
      }, 1000);
    });
  }

  static async enterClassroom(courseId: number): Promise<void> {
    // Navegar al classroom usando window.location
    window.location.href = `/classroom/${courseId}`;
  }

  static async openChat(courseId: number): Promise<void> {
    console.log(`Opening chat for course ${courseId}`);
    // Lógica para abrir chat
  }

  static async openMaterials(courseId: number): Promise<void> {
    console.log(`Opening materials for course ${courseId}`);
    // Lógica para abrir materiales
  }

  static async getCourseById(courseId: number): Promise<Course | null> {
    const courses = await this.getCourses();
    return courses.find(course => course.id === courseId) || null;
  }
}