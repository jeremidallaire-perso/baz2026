// The Prismic repo uses legacy (non-Slice Machine) custom types, so documents are loosely typed.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyDoc = any;

export type Category = { uid: string; name: string; featuredUids: string[] };

export type LangLink = { label: string; url: string; active: boolean };

export type MenuData = {
    lang: string;
    homeUrl: string;
    links: { label: AnyDoc; link: AnyDoc }[];
    orderedCategories: Category[];
    langLinks: LangLink[];
};
