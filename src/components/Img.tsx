import { PrismicNextImage } from '@prismicio/next';
import * as prismic from '@prismicio/client';

type ImgProps = {
    field: prismic.ImageField | null | undefined;
    className?: string;
    sizes?: string;
    priority?: boolean;
};

/** Replacement for <GatsbyImage>: a wrapper div (styled as .img-wrapper) around an optimised Prismic image. */
export function Img({ field, className, sizes = '100vw', priority }: ImgProps) {
    if (!prismic.isFilled.image(field)) return null;
    return (
        <div className={`img-wrapper ${className || ''}`}>
            <PrismicNextImage field={field} sizes={sizes} priority={priority} fallbackAlt="" />
        </div>
    );
}
