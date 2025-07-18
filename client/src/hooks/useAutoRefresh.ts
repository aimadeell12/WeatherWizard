import { useEffect, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useNotification } from '@/contexts/NotificationContext';

export const useAutoRefresh = (callback: () => void) => {
  const { settings } = useTheme();
  const { showNotification } = useNotification();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (settings.autoRefresh && settings.refreshInterval > 0) {
      // Clear existing interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      // Set new interval
      intervalRef.current = setInterval(() => {
        callback();
        
        // Show notification if enabled
        if (settings.notifications) {
          showNotification('تم تحديث بيانات الطقس', {
            body: 'تم تحديث بيانات الطقس تلقائياً',
            icon: '/favicon.ico',
            tag: 'weather-refresh'
          });
        }
      }, settings.refreshInterval * 60 * 1000); // Convert minutes to milliseconds

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    } else {
      // Clear interval if auto-refresh is disabled
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  }, [settings.autoRefresh, settings.refreshInterval, settings.notifications, callback, showNotification]);

  return {
    isAutoRefreshEnabled: settings.autoRefresh,
    refreshInterval: settings.refreshInterval
  };
};