import type * as prismic from '@prismicio/client';
import { VideoPlayer } from './VideoPlayer';
import { Img } from './Img';

export function ProjectHeaderFullScreen({ videoUrl, fullScreenImage }: { videoUrl: string; fullScreenImage: prismic.ImageField }) {
    return (
        <div className="projectHeaderFullScreenWrapper">
            {videoUrl ? (
                <VideoPlayer videoUrl={videoUrl} fullScreenImage={fullScreenImage} isHeaderVideo />
            ) : (
                <Img field={fullScreenImage} priority />
            )}
        </div>
    );
}
