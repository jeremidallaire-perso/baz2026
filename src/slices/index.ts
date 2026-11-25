import { FullWidthImage } from './FullWidthImage';
import { TextInfo } from './TextInfo';
import { Quote } from './Quote';
import { VideoPlayerSlice } from './VideoPlayerSlice';
import { ImageCaption } from './ImageCaption';
import { ImagesGrid } from './ImagesGrid';
import { TextBloc } from './TextBloc';
import { ProjectCreditsList, PageCreditsList } from './CreditsList';
import { ImagesSlideShow } from './ImagesSlideShow';

export const components = {
    full_width_image: FullWidthImage,
    text_info: TextInfo,
    quote: Quote,
    video: VideoPlayerSlice,
    image_with_caption: ImageCaption,
    text: TextBloc,
    credits_list: ProjectCreditsList,
    page_credits_list: PageCreditsList,
    images_grid: ImagesGrid,
    images_slideshow: ImagesSlideShow,
};
