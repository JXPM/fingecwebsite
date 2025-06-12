// fingec-website/src/lib/pushNotifications.ts
export async function subscribeToPushNotifications(subscriberId: number, publicVapidKey: string) {
    if (!('serviceWorker' in navigator)) {
      console.warn('Service workers not supported');
      return;
    }
  
    const registration = await navigator.serviceWorker.ready;
    
    try {
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
      });
  
      await fetch('/api/newsletter/push-subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscriberId,
          subscription
        }),
      });
  
      return true;
    } catch (error) {
      console.error('Error subscribing to push:', error);
      return false;
    }
  }
  
  function urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }