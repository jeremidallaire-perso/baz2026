import Link from 'next/link';
import { UI, docUrl, type LangCode } from '@/lib/i18n';

export function NotFound({ lang }: { lang: LangCode }) {
    return (
        <div className="not-found">
            <h1>404</h1>
            <h3>{UI[lang].notFound}</h3>
            <p>
                <Link href={docUrl({ type: 'homepage', lang })}>{UI[lang].backHome}</Link>
            </p>
        </div>
    );
}
