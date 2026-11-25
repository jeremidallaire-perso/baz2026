import 'server-only';
import * as prismic from '@prismicio/client';
import { createClient } from '@/prismicio';
import { LANGS, docUrl, langInfo } from './i18n';
import type { AnyDoc, Category, LangLink, MenuData } from './types';

type Client = ReturnType<typeof createClient>;

export async function getCategories(client: Client, lang: string): Promise<Category[]> {
    const docs = await client.getAllByType('categories', { lang });
    return docs.map((doc: AnyDoc) => ({
        uid: doc.uid,
        name: prismic.asText(doc.data.category_name) || doc.uid,
        featuredUids: (doc.data.featured_projects || [])
            .map((item: AnyDoc) => item.featured_project?.uid)
            .filter(Boolean),
    }));
}

/**
 * Links to the same document in every site language. Falls back to that language's homepage
 * when the document has no translation.
 */
export function getLangLinks(doc: AnyDoc | null, lang: string): LangLink[] {
    return LANGS.map((l) => {
        if (l.code === lang) return { label: l.label, url: doc ? docUrl(doc) : docUrl({ type: 'homepage', lang }), active: true };
        const alt = doc?.alternate_languages?.find((a: AnyDoc) => a.lang === l.code);
        return {
            label: l.label,
            url: alt ? docUrl({ type: doc.type, lang: l.code, uid: alt.uid }) : docUrl({ type: 'homepage', lang: l.code }),
            active: false,
        };
    });
}

/** Top menu links + the category filters in the order set in Prismic's top_menu. */
export async function getMenu(client: Client, lang: string, doc: AnyDoc | null, categories?: Category[]): Promise<MenuData> {
    const [topMenu, cats] = await Promise.all([
        client.getSingle('top_menu', { lang }).catch(() => null) as Promise<AnyDoc>,
        categories ? Promise.resolve(categories) : getCategories(client, lang),
    ]);

    const orderedCategories = (topMenu?.data.add_ordering_categories || [])
        .map((item: AnyDoc) => cats.find((c) => c.uid === item.add_a_category?.uid))
        .filter(Boolean) as Category[];

    const home = docUrl({ type: 'homepage', lang });
    return {
        lang,
        homeUrl: home,
        links: (topMenu?.data.menu_links || []).filter(
            (l: AnyDoc) => prismic.isFilled.link(l.link) && l.link.url && l.link.url !== home,
        ),
        orderedCategories,
        langLinks: getLangLinks(doc, lang),
    };
}

export async function getProjects(client: Client, lang: string) {
    return client.getAllByType('project', {
        lang,
        orderings: [{ field: 'my.project.date', direction: 'desc' }],
    });
}

export { langInfo };
