'use client';

import * as prismic from '@prismicio/client';
import { PrismicRichText, type SliceComponentProps } from '@prismicio/react';
import { useBreakpoint } from '@/lib/useBreakpoint';
import type { AnyDoc } from '@/lib/types';

/** Project credits (`credits_list`). */
export function ProjectCreditsList({ slice }: SliceComponentProps<AnyDoc>) {
    const breakpoints = useBreakpoint();
    const title = prismic.asText(slice.primary.credits_section_title);
    return (
        <div className={`sliceProjectCreditsList container ${breakpoints.sm ? 'mobile' : ''}`}>
            {title && <p className="sliceTitle">{title}</p>}
            <div className="creditWrapper">
                <div className={`creditItems ${breakpoints.sm ? 'mobile' : ''}`}>
                    {slice.items.map((item: AnyDoc, index: number) => (
                        <div className="creditItem" key={'item_' + index}>
                            <div className="category">
                                <PrismicRichText field={item.credit_title} />
                            </div>
                            <p className="separator">:</p>
                            <div className="names">
                                <PrismicRichText field={item.credit_name} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

/** Page credits (`page_credits_list`). */
export function PageCreditsList({ slice }: SliceComponentProps<AnyDoc>) {
    const breakpoints = useBreakpoint();
    const title = prismic.asText(slice.primary.page_credits_section_title);
    return (
        <div className={`sliceProjectCreditsList container ${breakpoints.sm ? 'mobile' : ''}`}>
            {title && <p className="creditSectioTitle">{title}</p>}
            <div className="creditWrapper">
                <div className="creditItems">
                    {slice.items.map((item: AnyDoc, index: number) => (
                        <div className="creditItem" key={'item_' + index}>
                            <div className="category">
                                <PrismicRichText field={item.page_credit_title} />
                            </div>
                            <p className="separator">:</p>
                            <div className="names">
                                <PrismicRichText field={item.page_credit_desc} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
