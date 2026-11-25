'use client';

import * as prismic from '@prismicio/client';
import { PrismicRichText, type SliceComponentProps } from '@prismicio/react';
import { Img } from '@/components/Img';
import { useBreakpoint } from '@/lib/useBreakpoint';
import type { AnyDoc } from '@/lib/types';

export function ImagesGrid({ slice }: SliceComponentProps<AnyDoc>) {
    const breakpoints = useBreakpoint();
    const title = prismic.asText(slice.primary.images_grid_title);
    return (
        <div className={`sliceImagesGrid container ${breakpoints.sm ? 'mobile' : ''}`}>
            {title && <p className="sliceTitle">{title}</p>}
            <div className="gridWrapper">
                {slice.items.map((item: AnyDoc, index: number) => (
                    <div className="gridItem" key={'item_' + index}>
                        <Img field={item.image} sizes="(max-width: 720px) 100vw, 50vw" />
                        <div className="gridImageDesc">
                            <PrismicRichText field={item.image_description} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
