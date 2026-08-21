import Image from 'next/image';

import type { Testimonials } from '@/lib/types';

function QuoteMark() {
    return (
        <span
            className="font-display text-[48px] font-bold leading-[48px] text-feature-peach"
            aria-hidden>
            &ldquo;
        </span>
    );
}

function AuthorPhoto({ testimonial }: { testimonial: Testimonials }) {
    return (
        <div className="relative h-[253px] w-[253px] overflow-hidden rounded-[56px]">
            <Image
                src={testimonial.avatarUrl}
                alt={testimonial.author}
                fill
                className="object-cover"
                unoptimized
            />
        </div>
    );
}

function QuoteCard({ testimonial }: { testimonial: Testimonials }) {
    return (
        <article className="flex h-[518px] w-[599px] flex-col justify-between rounded-[60px] bg-surface-white p-12">
            <div className="flex flex-col gap-4">
                <QuoteMark />
                <h3 className="font-display text-[26px] font-normal leading-[31.2px] tracking-[-0.78] text-text-secondary">
                    {testimonial.quote}
                </h3>
            </div>
            <footer className="flex flex-col">
                <p className="font-display text-[20px] font-medium leading-7 text-text-secondary">
                    {testimonial.author}
                </p>
                <p className="font-display text-sm leading-[22.4px] text-[#52545a]">
                    {testimonial.role}
                </p>
                <p className="font-display text-sm leading-[22.4px] text-[#52545a]">
                    {testimonial.company}
                </p>
            </footer>
        </article>
    );
}

export const TESTIMONIAL_LAYOUT_H = 518;
export const TESTIMONIAL_SLIDE_W = 1137;
export const TESTIMONIAL_SLIDE_PAD_R = 273;
export const TESTIMONIAL_NAV_W = 518;

const TESTIMONIAL_GRID_W = 864;
const TESTIMONIAL_GAP = 12;
const TESTIMONIAL_QUOTE_W = 599;
const TESTIMONIAL_PHOTO = 253;

export function SlideGrid({ testimonial }: { testimonial: Testimonials }) {
    return (
        <div
            className="grid shrink-0"
            style={{
                width: TESTIMONIAL_GRID_W,
                height: TESTIMONIAL_LAYOUT_H,
                gridTemplateColumns: `${TESTIMONIAL_PHOTO}px ${TESTIMONIAL_QUOTE_W}px`,
                gridTemplateRows: `${TESTIMONIAL_PHOTO}px ${TESTIMONIAL_PHOTO}px`,
                gap: TESTIMONIAL_GAP,
            }}>
            <div aria-hidden />
            <div className="col-start-2 row-span-2 row-start-1">
                <QuoteCard testimonial={testimonial} />
            </div>
            <AuthorPhoto testimonial={testimonial} />
        </div>
    );
}

export function MobileTestimonialCard({
    testimonial,
}: {
    testimonial: Testimonials;
}) {
    return (
        <article className="w-full shrink-0 rounded-[60px] bg-surface-white p-8 tablet-up:p-12">
            <QuoteMark />
            <h3 className="mt-4 font-display text-xl font-normal leading-[1.3] tracking-[-0.04] text-text-secondary">
                {testimonial.quote}
            </h3>
            <footer className="mt-8 flex items-center gap-4 border-t border-black/[0.06] pt-6">
                <div className="relative h-[100px] w-[100px] shrink-0 overflow-hidden rounded-full">
                    <Image
                        src={testimonial.avatarUrl}
                        alt={testimonial.author}
                        fill
                        className="object-cover"
                        unoptimized
                    />
                </div>
                <div>
                    <p className="font-display text-lg font-medium leading-7 text-text-secondary">
                        {testimonial.author}
                    </p>
                    <p className="font-display text-sm leading-[22.4px] text-[#52545a]">
                        {testimonial.role}
                    </p>
                    <p className="font-display text-sm leading-[22.4px] text-[#52545a]">
                        {testimonial.company}
                    </p>
                </div>
            </footer>
        </article>
    );
}
