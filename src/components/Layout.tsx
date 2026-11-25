'use client';

import { ParallaxProvider } from 'react-scroll-parallax';
import { TopMenu } from './TopMenu';
import type { MenuData } from '@/lib/types';

type LayoutProps = {
    children: React.ReactNode;
    menu: MenuData;
    activeFilter?: string;
};

export function Layout({ children, menu, activeFilter }: LayoutProps) {
    return (
        <ParallaxProvider>
            <TopMenu menu={menu} activeFilter={activeFilter} />
            <main>{children}</main>
        </ParallaxProvider>
    );
}
