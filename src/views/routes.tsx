import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import * as prismic from '@prismicio/client';
import { createClient } from '@/prismicio';
import { getCategories, getMenu, getProjects } from '@/lib/data';
import { HomeView } from './HomeView';
import { PageView } from './PageView';
import { ProjectView } from './ProjectView';

/*
 * Route implementations shared by every language. Each file under app/(en) and app/(fr)
 * is a one-liner that calls one of these with its language code.
 */

type UidParams = { params: Promise<{ uid: string }> };

async function getByUID(type: 'page' | 'project', uid: string, lang: string) {
    return createClient()
        .getByUID(type, uid, { lang })
        .catch((error) => {
            if (error instanceof prismic.NotFoundError) notFound();
            throw error;
        });
}

export function homeRoute(lang: string) {
    return {
        metadata: { title: { absolute: 'Baz' } } satisfies Metadata,
        async Page() {
            const client = createClient();
            const home = await client.getSingle('homepage', { lang }).catch(() => null);
            const categories = await getCategories(client, lang);
            const [menu, projects] = await Promise.all([
                getMenu(client, lang, home, categories),
                getProjects(client, lang),
            ]);
            return <HomeView slices={home?.data.body ?? []} menu={menu} projects={projects} categories={categories} />;
        },
    };
}

export function pageRoute(lang: string) {
    return {
        async generateStaticParams() {
            const pages = await createClient().getAllByType('page', { lang });
            return pages.map((page) => ({ uid: page.uid! }));
        },
        async generateMetadata({ params }: UidParams): Promise<Metadata> {
            const page = await getByUID('page', (await params).uid, lang);
            return {
                title: prismic.asText(page.data.page_title) || undefined,
                description: (prismic.asText(page.data.page_description) ?? '').slice(0, 160) || undefined,
            };
        },
        async Page({ params }: UidParams) {
            const page = await getByUID('page', (await params).uid, lang);
            const menu = await getMenu(createClient(), lang, page);
            return <PageView page={page} menu={menu} />;
        },
    };
}

export function projectRoute(lang: string) {
    return {
        async generateStaticParams() {
            const projects = await createClient().getAllByType('project', { lang });
            return projects.map((project) => ({ uid: project.uid! }));
        },
        async generateMetadata({ params }: UidParams): Promise<Metadata> {
            const project = await getByUID('project', (await params).uid, lang);
            const image = project.data.project_thumbnail;
            return {
                title: prismic.asText(project.data.title) || undefined,
                description: prismic.asText(project.data.project_subtitle) || undefined,
                openGraph: prismic.isFilled.image(image) ? { images: [{ url: image.url }] } : undefined,
            };
        },
        async Page({ params }: UidParams) {
            const project = await getByUID('project', (await params).uid, lang);
            const menu = await getMenu(createClient(), lang, project);
            return <ProjectView project={project} menu={menu} />;
        },
    };
}
