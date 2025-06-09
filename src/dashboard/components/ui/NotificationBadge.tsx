import React from 'react';

interface NotificationBadgeProps {
  count: number;
  className?: string;
}

const NotificationBadge: React.FC<NotificationBadgeProps> = ({ count, className = '' }) => {
  if (count === 0) return null;
  
  return (
    <span className={`absolute -top-1 -right-1 bg-primary text-light text-xs rounded-full w-5 h-5 flex items-center justify-center ${className}`}>
      {count}
    </span>
  );
};

export default NotificationBadge;