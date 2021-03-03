import { traverseMutationQueue } from 'app/services/MutationQueueHandler';
import { showNotification } from 'app/services/Notification';

  window.addEventListener('online', async() => {
    traverseMutationQueue();
    showNotification('You are online!');
  });
  
  window.addEventListener('offline', () => {
    showNotification('Connection lost');
  });


export const isNetoworkOnline = (): boolean => window.navigator.onLine;