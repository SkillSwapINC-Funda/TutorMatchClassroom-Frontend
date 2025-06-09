import React from 'react';
import { Bell, User } from 'lucide-react';
import NotificationBadge from './ui/NotificationBadge';

interface HeaderProps {
  notificationCount?: number;
}

const Header: React.FC<HeaderProps> = ({ notificationCount = 0 }) => {
  return (
    <header className="bg-dark-light border-b border-dark-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-light text-xl font-bold">TutorMatch</span>
              <span className="bg-primary text-light px-2 py-1 rounded text-sm font-medium">Classroom</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell className="w-6 h-6 text-light" />
              <NotificationBadge count={notificationCount} />
            </div>
            <div className="w-8 h-8 bg-light-gray rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-dark" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;