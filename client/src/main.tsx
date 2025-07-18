import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Register service worker for PWA functionality
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
        
        // Request persistent storage
        if ('storage' in navigator && 'persist' in navigator.storage) {
          navigator.storage.persist().then((persistent) => {
            console.log('Persistent storage:', persistent);
          }).catch((error) => {
            console.log('Persistent storage not supported:', error);
          });
        }
        
        // Register for background sync (basic support)
        if ('serviceWorker' in navigator && 
            'sync' in window.ServiceWorkerRegistration.prototype && 
            registration.sync) {
          try {
            // Only register if we have a valid window context
            if (typeof window !== 'undefined' && window.location) {
              await registration.sync.register('weather-sync');
              console.log('Background sync registered successfully');
            }
          } catch (error) {
            console.log('Background sync registration failed:', error);
          }
        } else {
          console.log('Background sync not supported in this browser');
        }
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

createRoot(document.getElementById("root")!).render(<App />);
