import type { LangLink } from '@/lib/types';

/** EN / FR links. Plain <a> on purpose: each language has its own root layout (<html lang>), so a full load is needed. */
export function LanguageSwitcher({ links }: { links: LangLink[] }) {
    return (
        <div className="menuItem language-switcher">
            {links.map((link, index) => (
                <span key={link.label}>
                    {index > 0 && <span className="language-separator"> / </span>}
                    {link.active ? (
                        <p className="active" aria-current="true">
                            {link.label}
                        </p>
                    ) : (
                        <a href={link.url} hrefLang={link.label.toLowerCase()}>
                            <p>{link.label}</p>
                        </a>
                    )}
                </span>
            ))}
        </div>
    );
}
