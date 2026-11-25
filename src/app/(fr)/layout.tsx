import { RootLayout, rootMetadata, rootViewport } from '@/views/RootLayout';

export const metadata = rootMetadata;
export const viewport = rootViewport;

export default function Layout({ children }: { children: React.ReactNode }) {
    return <RootLayout lang="fr-ca">{children}</RootLayout>;
}
