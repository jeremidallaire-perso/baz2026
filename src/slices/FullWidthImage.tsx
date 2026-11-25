import type { SliceComponentProps } from '@prismicio/react';
import { Img } from '@/components/Img';
import type { AnyDoc } from '@/lib/types';

export function FullWidthImage({ slice }: SliceComponentProps<AnyDoc>) {
    return (
        <section className="full-width-image auto-grid">
            <div className="main-img">
                <Img field={slice.primary.image} />
            </div>
        </section>
    );
}
