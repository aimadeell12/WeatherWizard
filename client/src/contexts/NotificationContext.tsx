import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTheme } from './ThemeContext';

interface NotificationContextType {
  requestNotificationPermission: () => Promise<boolean>;
  showNotification: (title: string, options?: NotificationOptions) => void;
  isNotificationSupported: boolean;
  permissionStatus: NotificationPermission;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission>('default');
  const [isNotificationSupported, setIsNotificationSupported] = useState(false);
  const { settings } = useTheme();

  useEffect(() => {
    // Check if notifications are supported
    if ('Notification' in window) {
      setIsNotificationSupported(true);
      setPermissionStatus(Notification.permission);
    }
  }, []);

  const requestNotificationPermission = async (): Promise<boolean> => {
    if (!isNotificationSupported) return false;

    try {
      const permission = await Notification.requestPermission();
      setPermissionStatus(permission);
      return permission === 'granted';
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  };

  const showNotification = (title: string, options?: NotificationOptions) => {
    if (!settings.notifications || !isNotificationSupported || permissionStatus !== 'granted') {
      return;
    }

    const defaultOptions: NotificationOptions = {
      icon: '/favicon.ico',
      dir: settings.language === 'ar' ? 'rtl' : 'ltr',
      lang: settings.language,
      tag: 'weather-app',
      ...options
    };

    new Notification(title, defaultOptions);
  };

  return (
    <NotificationContext.Provider value={{
      requestNotificationPermission,
      showNotification,
      isNotificationSupported,
      permissionStatus
    }}>
      {children}
    </NotificationContext.Provider>
  );
};