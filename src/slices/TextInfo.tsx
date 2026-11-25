import * as prismic from '@prismicio/client';
import { PrismicRichText, type SliceComponentProps } from '@prismicio/react';
import type { AnyDoc } from '@/lib/types';

export function TextInfo({ slice }: SliceComponentProps<AnyDoc>) {
    const title = prismic.asText(slice.primary.section_title);
    return (
        <section className="text-info">
            {title && <p className="sliceTitle">{title}</p>}
            <div className="wrapperInfo">
                <div className="left-column">
                    <PrismicRichText field={slice.primary.left_column_text} />
                </div>
                <div className="right-column">
                    <PrismicRichText field={slice.primary.right_column_text} />
                </div>
            </div>
        </section>
    );
}
