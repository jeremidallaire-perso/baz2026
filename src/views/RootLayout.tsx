import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import { PrismicPreview } from '@prismicio/next';
import { repositoryName } from '@/prismicio';
import { langInfo } from '@/lib/i18n';
import '@/styles/main.scss';

const poppins = Poppins({
    subsets: ['latin', 'latin-ext'],
    weight: ['300', '500', '600', '700', '900'],
    variable: '--font-poppins',
    display: 'swap',
});

export const rootMetadata: Metadata = {
    metadataBase: new URL(process.env.URL || 'http://localhost:3000'),
    title: { default: 'Baz', template: '%s | Baz' },
    description: 'Hello, my name is Baz',
};

export const rootViewport: Viewport = { width: 'device-width', initialScale: 1 };

/** <html> shell shared by the English and French root layouts. */
export function RootLayout({ lang, children }: { lang: string; children: React.ReactNode }) {
    return (
        <html lang={langInfo(lang).html} className={poppins.variable}>
            <head>
                {/* eslint-disable-next-line @next/next/no-css-tags */}
                <link rel="stylesheet" href="/fonts/fonts.css" />
            </head>
            <body>
                {children}
                <PrismicPreview repositoryName={repositoryName} />
            </body>
        </html>
    );
}
