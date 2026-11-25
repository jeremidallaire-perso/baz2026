'use client';

import Link from 'next/link';
import type { Category } from '@/lib/types';

type Props = { activeFilter?: string; categories: Category[]; homeUrl: string; label: string };

/** Category filters. They are plain links to <home>?filter=<uid>, so they work from any page. */
export function ProjectFiltersMenu({ activeFilter, categories, homeUrl, label }: Props) {
    return (
        <>
            <div className="menuItem section">
                <Link href={`${homeUrl}?filter=category_featured`}>
                    <p className="mainSectionTitle">{label}</p>
                </Link>
            </div>
            {categories.map((category) => (
                <div className={`menuItem ${activeFilter === category.uid ? 'active' : ''}`} key={category.uid}>
                    <Link href={`${homeUrl}?filter=${category.uid}`}>
                        <p>{category.name}</p>
                    </Link>
                </div>
            ))}
        </>
    );
}
