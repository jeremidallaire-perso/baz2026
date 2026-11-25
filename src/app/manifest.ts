import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Baz',
        short_name: 'Baz',
        start_url: '/',
        display: 'minimal-ui',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [{ src: '/icon.png', sizes: '62x62', type: 'image/png' }],
    };
}
