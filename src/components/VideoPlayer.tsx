'use client';

import { useState } from 'react';
import ReactPlayer from 'react-player';
import type * as prismic from '@prismicio/client';
import { useBreakpoint } from '@/lib/useBreakpoint';
import { Img } from './Img';

type VideoPlayerProps = {
    videoUrl: string;
    fullScreenImage?: prismic.ImageField;
    isHeaderVideo?: boolean;
    isAutoplay?: boolean;
};

export function VideoPlayer({ videoUrl, fullScreenImage }: VideoPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const breakpoints = useBreakpoint();

    if (!videoUrl) return null;

    return (
        <div className={`sliceVideoPlayer imageWithCta ${breakpoints.sm ? 'mobile' : ''}`}>
            {fullScreenImage?.url && (
                <div className={`videoThumbnailsOverlay ${isPlaying ? 'hideVideoThumbnailsOverlay' : ''}`}>
                    {!isPlaying && <Img field={fullScreenImage} priority />}
                </div>
            )}

            <div className="playerWrapper">
                <div className="react-player">
                    <ReactPlayer
                        src={videoUrl}
                        width="100%"
                        height="100%"
                        style={{ position: 'absolute', top: 0, left: 0 }}
                        loop
                        controls
                        playing={isPlaying}
                        onPause={() => setIsPlaying(false)}
                        onPlay={() => setIsPlaying(true)}
                    />
                </div>
            </div>
            {!isPlaying && (
                <button type="button" className="projectCta" onClick={() => setIsPlaying(true)}>
                    <p>Play</p>
                    <span className="bg"></span>
                </button>
            )}
        </div>
    );
}
