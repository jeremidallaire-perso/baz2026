import * as prismic from '@prismicio/client';
import { enableAutoPreviews } from '@prismicio/next';
import { LANGS } from '@/lib/i18n';

export const repositoryName = 'bazwebsite';

/**
 * How Prismic documents map to URLs, per language (English at the root, French under /fr).
 * Same URLs as the old Gatsby site for English. Keep in sync with docUrl() in src/lib/i18n.ts.
 */
const routes: prismic.ClientConfig['routes'] = LANGS.flatMap(({ code, prefix }) => [
    { type: 'homepage', lang: code, path: prefix || '/' },
    { type: 'page', lang: code, path: `${prefix}/page/:uid` },
    { type: 'project', lang: code, path: `${prefix}/project/:uid` },
]);

export function createClient(config: prismic.ClientConfig = {}) {
    const client = prismic.createClient(repositoryName, {
        routes,
        accessToken: process.env.PRISMIC_ACCESS_TOKEN || undefined,
        fetchOptions: process.env.NODE_ENV === 'production' ? { cache: 'force-cache' } : { next: { revalidate: 5 } },
        ...config,
    });

    enableAutoPreviews({ client });

    return client;
}
