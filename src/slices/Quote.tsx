'use client';

import { PrismicRichText, type SliceComponentProps } from '@prismicio/react';
import { useBreakpoint } from '@/lib/useBreakpoint';
import type { AnyDoc } from '@/lib/types';

export function Quote({ slice }: SliceComponentProps<AnyDoc>) {
    const breakpoints = useBreakpoint();
    return (
        <div className={`post-quote container ${breakpoints.sm ? 'mobile' : ''}`}>
            <blockquote>
                <PrismicRichText field={slice.primary.quote_content} />
            </blockquote>
        </div>
    );
}
