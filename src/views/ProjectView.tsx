'use client';

import * as prismic from '@prismicio/client';
import { PrismicText, SliceZone } from '@prismicio/react';
import { Parallax } from 'react-scroll-parallax';
import { Layout } from '@/components/Layout';
import { ProjectHeaderFullScreen } from '@/components/ProjectHeaderFullScreen';
import { components } from '@/slices';
import { useBreakpoint } from '@/lib/useBreakpoint';
import type { AnyDoc, MenuData } from '@/lib/types';

export function ProjectView({ project, menu }: { project: AnyDoc; menu: MenuData }) {
    const breakpoints = useBreakpoint();
    const data = project.data;

    return (
        <Layout menu={menu}>
            <div className="pageWrapper">
                <div className={`projectHeaderWrapper ${breakpoints.sm ? 'mobile' : ''}`}>
                    <Parallax speed={0} className="projectInfoWrapper">
                        <div className="projectInfoWrapper">
                            <h2>{prismic.asText(data.title) || 'Untitled'}</h2>
                            <p className="projectInfoDesc">
                                <PrismicText field={data.project_subtitle} />
                            </p>
                        </div>
                    </Parallax>
                    <ProjectHeaderFullScreen
                        videoUrl={prismic.asText(data.project_video_link) ?? ""}
                        fullScreenImage={data.project_thumbnail}
                    />
                </div>
                <div className="mediasWrapper">
                    <SliceZone slices={data.body} components={components} />
                </div>
            </div>
        </Layout>
    );
}
