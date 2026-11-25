'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { SliceZone } from '@prismicio/react';
import { Layout } from '@/components/Layout';
import { Projects } from '@/components/Projects';
import { components } from '@/slices';
import type { AnyDoc, Category, MenuData } from '@/lib/types';

const DEFAULT_FILTER = 'category_featured';

type HomeViewProps = {
    slices: AnyDoc[];
    menu: MenuData;
    projects: AnyDoc[];
    categories: Category[];
};

/** Reads ?filter= from the URL. Isolated in Suspense so the rest of the page can still be prerendered. */
function FilterFromUrl({ onChange }: { onChange: (filter: string) => void }) {
    const filter = useSearchParams().get('filter') || DEFAULT_FILTER;
    useEffect(() => onChange(filter), [filter, onChange]);
    return null;
}

export function HomeView({ slices, menu, projects, categories }: HomeViewProps) {
    const [activeFilter, setActiveFilter] = useState(DEFAULT_FILTER);

    // Featured projects of the category first (in their Prismic order), then every other project tagged with it.
    const { category, filteredProjects } = useMemo(() => {
        const category = categories.find((c) => c.uid === activeFilter);
        // No such category in this language yet (e.g. French): show every project instead of an empty page.
        if (!category) return { category, filteredProjects: projects };
        const featuredUids = category?.featuredUids || [];
        const featured = featuredUids
            .map((uid) => projects.find((p) => p.uid === uid))
            .filter(Boolean) as AnyDoc[];
        const tagged = projects.filter(
            (p) =>
                !featuredUids.includes(p.uid) &&
                (p.data.project_categories || []).some((c: AnyDoc) => c.project_category?.uid === activeFilter),
        );
        return { category, filteredProjects: [...featured, ...tagged] };
    }, [activeFilter, categories, projects]);

    return (
        <Layout menu={menu} activeFilter={activeFilter}>
            <Suspense fallback={null}>
                <FilterFromUrl onChange={setActiveFilter} />
            </Suspense>
            <SliceZone slices={slices} components={components} />
            {filteredProjects.length > 0 && (
                <Projects projects={filteredProjects} activeFilter={activeFilter} activeCategoryName={category?.name} />
            )}
        </Layout>
    );
}
