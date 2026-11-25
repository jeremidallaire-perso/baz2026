'use client';

import { PrismicRichText, type SliceComponentProps } from '@prismicio/react';
import { useBreakpoint } from '@/lib/useBreakpoint';
import type { AnyDoc } from '@/lib/types';

export function TextBloc({ slice }: SliceComponentProps<AnyDoc>) {
    const breakpoints = useBreakpoint();
    return (
        <div className={`post-text container ${breakpoints.sm ? 'mobile' : ''}`}>
            <div>
                <PrismicRichText field={slice.primary.text} />
            </div>
        </div>
    );
}
