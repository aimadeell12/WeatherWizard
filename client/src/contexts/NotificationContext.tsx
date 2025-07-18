import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTheme } from './ThemeContext';

interface NotificationContextType {
  requestNotificationPermission: () => Promise<boolean>;
  showNotification: (title: string, options?: NotificationOptions) => void;
  subscribeToPush: () => Promise<PushSubscription | null>;
  isNotificationSupported: boolean;
  permissionStatus: NotificationPermission;
  isPushSupported: boolean;
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
  const [isPushSupported, setIsPushSupported] = useState(false);
  const { settings } = useTheme();

  useEffect(() => {
    // Check if notifications are supported
    if ('Notification' in window) {
      setIsNotificationSupported(true);
      setPermissionStatus(Notification.permission);
    }
    
    // Check if push notifications are supported
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsPushSupported(true);
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
      icon: '/icon-any.svg',
      dir: settings.language === 'ar' ? 'rtl' : 'ltr',
      lang: settings.language,
      tag: 'weather-app',
      ...options
    };

    new Notification(title, defaultOptions);
  };

  const subscribeToPush = async (): Promise<PushSubscription | null> => {
    if (!isPushSupported || !isNotificationSupported || permissionStatus !== 'granted') {
      return null;
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array('BEl62iUYgUivxIkv69yViEuiBIa40HI80j6GnALNgYKNgM0rP8xNUHJfLNEkJhJ2mHDmfpqRgEGCc9XCjhJXRoI')
      });
      
      return subscription;
    } catch (error) {
      console.error('Error subscribing to push notifications:', error);
      return null;
    }
  };

  // Helper function to convert VAPID key
  const urlBase64ToUint8Array = (base64String: string) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  return (
    <NotificationContext.Provider value={{
      requestNotificationPermission,
      showNotification,
      subscribeToPush,
      isNotificationSupported,
      permissionStatus,
      isPushSupported
    }}>
      {children}
    </NotificationContext.Provider>
  );
};