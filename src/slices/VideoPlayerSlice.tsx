'use client';

import * as prismic from '@prismicio/client';
import type { SliceComponentProps } from '@prismicio/react';
import { VideoPlayer } from '@/components/VideoPlayer';
import { useBreakpoint } from '@/lib/useBreakpoint';
import type { AnyDoc } from '@/lib/types';

export function VideoPlayerSlice({ slice }: SliceComponentProps<AnyDoc>) {
    const breakpoints = useBreakpoint();
    return (
        <div className={`wrapperVideoPlayerSlice container ${breakpoints.sm ? 'mobile' : ''}`}>
            <VideoPlayer videoUrl={prismic.asText(slice.primary.video_url) ?? ""} />
        </div>
    );
}
