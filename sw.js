// Service Worker for Push Notifications
self.addEventListener('push', function(event) {
    let data = { title: 'Thiruvasantham26', body: 'New update available!' };
    
    if (event.data) {
        try {
            data = event.data.json();
        } catch (e) {
            data.body = event.data.text();
        }
    }

    const options = {
        body: data.body,
        icon: 'https://lh3.googleusercontent.com/d/1stXTU5DgHYSh0LHpNzCSUF53Ck7Qj_vV',
        badge: 'https://lh3.googleusercontent.com/d/1stXTU5DgHYSh0LHpNzCSUF53Ck7Qj_vV',
        vibrate: [200, 100, 200]
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
            for (let i = 0; i < clientList.length; i++) {
                let client = clientList[i];
                if ('focus' in client) return client.focus();
            }
            if (clients.openWindow) {
                return clients.openWindow('./');
            }
        })
    );
});
