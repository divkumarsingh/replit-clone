"use client"

import { TestimonialDesktopCarousel } from "./testimonial-desktop-carousel"
import { TestimonialMobileCarousel } from "./testimonial-mobile"

export function TestimonialSection() {
    return (
        <>
            <TestimonialMobileCarousel />
            <TestimonialDesktopCarousel />
        </>
    )
}