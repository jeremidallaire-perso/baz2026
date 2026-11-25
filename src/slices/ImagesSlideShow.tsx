'use client';

import { useState } from 'react';
import * as prismic from '@prismicio/client';
import type { SliceComponentProps } from '@prismicio/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Img } from '@/components/Img';
import { useBreakpoint } from '@/lib/useBreakpoint';
import type { AnyDoc } from '@/lib/types';

export function ImagesSlideShow({ slice }: SliceComponentProps<AnyDoc>) {
    const breakpoints = useBreakpoint();
    const title = prismic.asText(slice.primary.slideshow_title);
    const perView = breakpoints.sm ? 1 : 3;
    // Arrow elements are passed to Swiper directly (not as CSS selectors): Prismic slice ids contain `$`,
    // which isn't valid in a selector, and this keeps each slideshow's arrows scoped to itself.
    const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
    const [nextEl, setNextEl] = useState<HTMLElement | null>(null);
    return (
        <div className={`sliceImagesSlideShow container ${breakpoints.sm ? 'mobile' : ''}`}>
            {title && <p className="sliceTitle">{title}</p>}
            <div className="slideShowWrapper">
                <Swiper
                    slidesPerView={perView}
                    slidesPerGroup={perView}
                    spaceBetween={10}
                    grabCursor
                    navigation={{ prevEl, nextEl }}
                    modules={[Navigation]}
                    className="mySwiper"
                >
                    {slice.items.map((item: AnyDoc, index: number) => (
                        <SwiperSlide key={'item_' + index}>
                            <div className="item">
                                <Img field={item.image} sizes="(max-width: 720px) 100vw, 33vw" />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div ref={setPrevEl} className="swiper-button-prev"></div>
            <div ref={setNextEl} className="swiper-button-next"></div>
        </div>
    );
}
