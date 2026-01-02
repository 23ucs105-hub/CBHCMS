// Service worker for push notifications
self.addEventListener('push', (event) => {
    const data = event.data ? event.data.json() : {};
    const title = data.title || 'CBHCMS Alert';
    const options = {
        body: data.body || 'New alert notification',
        icon: '/logo.png',
        badge: '/logo.png',
        vibrate: [200, 100, 200],
        data: { url: data.url || '/worker' },
        actions: [
            { action: 'view', title: 'View Alert' },
            { action: 'close', title: 'Close' }
        ]
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    if (event.action === 'view' || !event.action) {
        const url = event.notification.data.url;
        event.waitUntil(
            clients.openWindow(url)
        );
    }
});
