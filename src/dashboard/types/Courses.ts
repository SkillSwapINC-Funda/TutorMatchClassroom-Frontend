export interface Course {
  id: number;
  title: string;
  tutor: string;
  nextSession: string;
  status: string;
  statusColor: string;
  chatNotification: number;
  materialsNotification: number;
}