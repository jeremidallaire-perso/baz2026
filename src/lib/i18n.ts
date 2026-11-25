/** Site languages. English lives at the root, French under /fr. */
export const LANGS = [
    { code: 'en-us', prefix: '', html: 'en', label: 'EN' },
    { code: 'fr-ca', prefix: '/fr', html: 'fr', label: 'FR' },
] as const;

export type LangCode = (typeof LANGS)[number]['code'];
export const DEFAULT_LANG: LangCode = 'en-us';

export function langInfo(code: string) {
    return LANGS.find((l) => l.code === code) ?? LANGS[0];
}

/** URL of a Prismic document. Must stay in sync with the routes in src/prismicio.ts. */
export function docUrl(doc: { type: string; lang: string; uid?: string | null }) {
    const prefix = langInfo(doc.lang).prefix;
    switch (doc.type) {
        case 'homepage':
            return prefix || '/';
        case 'page':
            return `${prefix}/page/${doc.uid}`;
        case 'project':
            return `${prefix}/project/${doc.uid}`;
        default:
            return prefix || '/';
    }
}

/** UI strings that don't come from Prismic. */
export const UI = {
    'en-us': { projects: 'Projets', notFound: 'The page you are looking for was not found', backHome: 'Return to homepage' },
    'fr-ca': { projects: 'Projets', notFound: "La page que vous cherchez n'existe pas", backHome: "Retour à l'accueil" },
} satisfies Record<LangCode, Record<string, string>>;
