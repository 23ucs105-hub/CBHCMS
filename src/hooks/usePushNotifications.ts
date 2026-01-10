import { useEffect, useState } from 'react';

export function usePushNotifications() {
    const [isSupported, setIsSupported] = useState(false);
    const [permission, setPermission] = useState<NotificationPermission>('default');

    useEffect(() => {
        if ('Notification' in window && 'serviceWorker' in navigator) {
            setIsSupported(true);
            setPermission(Notification.permission);
        }
    }, []);

    const requestPermission = async () => {
        if (!isSupported) return false;

        try {
            const result = await Notification.requestPermission();
            setPermission(result);
            return result === 'granted';
        } catch (error) {
            console.error('Error requesting notification permission:', error);
            return false;
        }
    };

    const showNotification = async (title: string, options?: NotificationOptions) => {
        if (permission !== 'granted') {
            const granted = await requestPermission();
            if (!granted) return;
        }

        if ('serviceWorker' in navigator) {
            const registration = await navigator.serviceWorker.ready;
            await registration.showNotification(title, {
                icon: '/logo.png',
                badge: '/logo.png',
                ...options
            });
        } else {
            new Notification(title, options);
        }
    };

    return {
        isSupported,
        permission,
        requestPermission,
        showNotification
    };
}
