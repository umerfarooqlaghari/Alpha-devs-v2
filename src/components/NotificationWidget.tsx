'use client';

import React, { useEffect } from 'react';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
}

interface NotificationWidgetProps {
  notifications: Notification[];
  onRemove: (id: string) => void;
}

const NotificationWidget: React.FC<NotificationWidgetProps> = ({ notifications, onRemove }) => {
  useEffect(() => {
    notifications.forEach((notification) => {
      if (notification.duration) {
        const timer = setTimeout(() => {
          onRemove(notification.id);
        }, notification.duration);

        return () => clearTimeout(timer);
      }
    });
  }, [notifications, onRemove]);

  const getNotificationStyles = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-900/90 border-green-500/50 text-green-100';
      case 'error':
        return 'bg-red-900/90 border-red-500/50 text-red-100';
      case 'warning':
        return 'bg-yellow-900/90 border-yellow-500/50 text-yellow-100';
      case 'info':
        return 'bg-blue-900/90 border-blue-500/50 text-blue-100';
      default:
        return 'bg-gray-900/90 border-gray-500/50 text-gray-100';
    }
  };

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      case 'info':
        return 'ℹ';
      default:
        return '•';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`
            ${getNotificationStyles(notification.type)}
            backdrop-filter backdrop-blur-lg
            border rounded-lg p-4 min-w-80 max-w-96
            shadow-2xl animate-slide-in-right
            transition-all duration-300 hover:scale-105
          `}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div className="text-lg font-bold">
                {getIcon(notification.type)}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm">{notification.title}</h4>
                <p className="text-xs mt-1 opacity-90">{notification.message}</p>
              </div>
            </div>
            <button
              onClick={() => onRemove(notification.id)}
              className="text-current opacity-70 hover:opacity-100 transition-opacity ml-2"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationWidget;
