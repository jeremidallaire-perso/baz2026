'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PrismicNextLink } from '@prismicio/next';
import { PrismicText } from '@prismicio/react';
import { Parallax } from 'react-scroll-parallax';
import { useBreakpoint } from '@/lib/useBreakpoint';
import { ProjectFiltersMenu } from './ProjectFiltersMenu';
import { LanguageSwitcher } from './LanguageSwitcher';
import { UI, type LangCode } from '@/lib/i18n';
import type { MenuData } from '@/lib/types';

export function TopMenu({ menu, activeFilter }: { menu: MenuData; activeFilter?: string }) {
    const breakpoints = useBreakpoint();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const home = `${menu.homeUrl}?filter=category_featured`;
    const ui = UI[menu.lang as LangCode] ?? UI['en-us'];
    const bigLogo = activeFilter === 'category_featured' && !breakpoints.sm;

    return (
        <Parallax
            speed={breakpoints.sm ? 0 : 100}
            translateY={breakpoints.sm ? [0, 0] : [-30, 40]}
            style={{ position: 'relative', zIndex: 100 }}
        >
            <header>
                <div className="leftside">
                    <div className={`headerLogo ${bigLogo ? '' : 'small'}`}>
                        <Link href={home}>
                            {bigLogo ? (
                                <h1>
                                    HELLO,
                                    <br />
                                    MY NAME
                                    <br />
                                    IS BAZ
                                </h1>
                            ) : (
                                <h6>
                                    HELLO,
                                    <br />
                                    MY NAME
                                    <br />
                                    IS BAZ
                                </h6>
                            )}
                        </Link>
                    </div>
                </div>
                <div className={`rightside ${breakpoints.sm ? 'mobile' : ''}`}>
                    <nav className={`menuWrapper ${breakpoints.sm ? 'mobile' : ''} ${isMenuOpen ? 'open' : 'close'}`}>
                        <ProjectFiltersMenu
                            activeFilter={activeFilter}
                            categories={menu.orderedCategories}
                            homeUrl={menu.homeUrl}
                            label={ui.projects}
                        />
                        {menu.links.map((menuLink, index) => (
                            <div className="menuItem section" key={`menuItem-${index}`}>
                                <PrismicNextLink field={menuLink.link}>
                                    <p className="mainSectionTitle">
                                        <PrismicText field={menuLink.label} />
                                    </p>
                                </PrismicNextLink>
                            </div>
                        ))}
                        <LanguageSwitcher links={menu.langLinks} />
                    </nav>
                    {breakpoints.sm && (
                        <button
                            type="button"
                            className="burgerMenu"
                            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={isMenuOpen}
                            onClick={() => setIsMenuOpen((open) => !open)}
                        >
                            {isMenuOpen ? (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="30px" height="30px">
                                    <path
                                        fill="#000"
                                        d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"
                                    />
                                </svg>
                            ) : (
                                <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 18L20 18" stroke="#000" strokeWidth="2" strokeLinecap="round" />
                                    <path d="M4 12L20 12" stroke="#000" strokeWidth="2" strokeLinecap="round" />
                                    <path d="M4 6L20 6" stroke="#000" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            )}
                        </button>
                    )}
                </div>
            </header>
        </Parallax>
    );
}
