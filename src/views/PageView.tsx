'use client';

import * as prismic from '@prismicio/client';
import { PrismicRichText, SliceZone } from '@prismicio/react';
import { Parallax } from 'react-scroll-parallax';
import { Layout } from '@/components/Layout';
import { Img } from '@/components/Img';
import { components } from '@/slices';
import { useBreakpoint } from '@/lib/useBreakpoint';
import type { AnyDoc, MenuData } from '@/lib/types';

export function PageView({ page, menu }: { page: AnyDoc; menu: MenuData }) {
    const breakpoints = useBreakpoint();
    const data = page.data;

    return (
        <Layout menu={menu}>
            <div className={`pageWrapper ${breakpoints.sm ? 'mobile' : ''}`}>
                <Parallax speed={0} className="pageHeaderWrapper">
                    <h2>{prismic.asText(data.page_title) || 'Untitled'}</h2>
                </Parallax>
                <div className="pageInfoWrapper pageAbout">
                    <div className="leftSide">
                        {(data.page_images || []).map((image: AnyDoc, index: number) => (
                            <div className="item" key={'page_image_' + index}>
                                <Img field={image.page_image} sizes="(max-width: 720px) 100vw, 50vw" />
                            </div>
                        ))}
                    </div>
                    <div className="rightSide">
                        {prismic.isFilled.richText(data.page_description) && (
                            <div className="pageDescription">
                                <PrismicRichText field={data.page_description} />
                            </div>
                        )}
                        <div className="pageSliceZone">
                            <SliceZone slices={data.body} components={components} />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
