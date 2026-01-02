import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Community Based Health Care Management System',
        short_name: 'CBHCMS',
        description: 'A comprehensive system for managing community health workers and alerts.',
        start_url: '/',
        display: 'standalone',
        background_color: '#020617',
        theme_color: '#10b981',
        icons: [
            {
                src: '/logo.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/logo.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    };
}
