"use client";

import { Container } from "@/components/ui/container";
import { InfiniteCarousel } from "@/components/ui/infinite-carousel";
import { testimonials } from "@/lib/landing-data";
import { MobileTestimonialCard } from "./testimonial-cards";

export function TestimonialMobileCarousel() {
    return <section id="testimonials" className="pt-[84] pb-12 desktop:hidden">
        <Container>
            <p className="text-xs font-semibold uppercase tracking-widest text-replit-orange">Endrosed by Innovators.</p>
            <h2 className="mt-2 font-display text-[32px] leading-[32px] tracking-[-0.04em] text-text-agent-heading">Trusted by builders.</h2>
            <InfiniteCarousel items={testimonials} renderSlide={(testimonials) => (
                //Mobile Testimonial card testimonial={testimonial}
                <MobileTestimonialCard testimonial={testimonials} />
            )} getDotLabel={(_, index) => `Go to testimonials ${index + 1}`}
                viewportClassName="mt-8" />
        </Container>
    </section>
}