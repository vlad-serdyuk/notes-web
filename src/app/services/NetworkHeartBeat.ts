import { traverseMutationQueue } from 'app/services/MutationQueueHandler';

  window.addEventListener('online', async() => {
    traverseMutationQueue();
  });
  
  window.addEventListener('offline', () => {
      console.log('offline');
  });


export const isNetoworkOnline = (): boolean => window.navigator.onLine;