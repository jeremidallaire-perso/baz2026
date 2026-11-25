'use client';

import Link from 'next/link';
import { PrismicRichText } from '@prismicio/react';
import * as prismic from '@prismicio/client';
import { Parallax } from 'react-scroll-parallax';
import { useBreakpoint } from '@/lib/useBreakpoint';
import { Img } from './Img';
import type { AnyDoc } from '@/lib/types';

type ProjectsProps = {
    projects: AnyDoc[];
    activeFilter: string;
    activeCategoryName?: string;
};

export function Projects({ projects, activeFilter, activeCategoryName }: ProjectsProps) {
    const breakpoints = useBreakpoint();
    const isFeaturedLayout = activeFilter === 'category_featured';

    return (
        <div
            className={`projectsWrapper ${isFeaturedLayout && !breakpoints.sm ? 'featuredLayout' : 'classicLayout'} ${
                breakpoints.sm ? 'classicMobileLayout' : ''
            }`}
        >
            {!isFeaturedLayout && (
                <Parallax speed={10} className="categoryName">
                    <div className="categoryName">
                        <h2>{activeCategoryName}</h2>
                    </div>
                </Parallax>
            )}

            {projects.map((project) => (
                <Parallax speed={5} key={project.id} className="projectThumbnail imageWithCta">
                    <Link className="projectImageWrapper" href={project.url}>
                        <div className="projectThumbnailInfo">
                            <h3 className="projectThumnailTitle">{prismic.asText(project.data.title)}</h3>
                            <div className="projectThumnailSubTitle">
                                <PrismicRichText field={project.data.project_subtitle} />
                            </div>
                            <div className="projectCta">
                                <p>View</p>
                                <span className="bg"></span>
                            </div>
                        </div>
                        <Img
                            className="projectThumbnailImg"
                            field={project.data.project_thumbnail}
                            sizes="(max-width: 720px) 100vw, 50vw"
                        />
                    </Link>
                </Parallax>
            ))}
        </div>
    );
}
