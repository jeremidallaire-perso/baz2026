import * as prismic from '@prismicio/client';
import type { SliceComponentProps } from '@prismicio/react';
import type { AnyDoc } from '@/lib/types';

export function ImageCaption({ slice }: SliceComponentProps<AnyDoc>) {
    const image = slice.primary.image;
    const caption = prismic.asText(slice.primary.caption);
    if (!prismic.isFilled.image(image)) return null;

    if (slice.slice_label === 'image-full-width') {
        return (
            <div className="post-image full-width-image" style={{ backgroundImage: `url(${image.url})` }}>
                <div className="wrapper">{caption && <span className="image-label">{caption}</span>}</div>
            </div>
        );
    }

    return (
        <div className="post-image container">
            <figure className={`block-img ${slice.slice_label === 'emphasized' ? 'emphasized' : ''}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image.url} alt={image.alt || ''} />
                {caption && <figcaption className="image-label">{caption}</figcaption>}
            </figure>
        </div>
    );
}
