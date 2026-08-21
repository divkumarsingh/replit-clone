import { HeroPromptArea } from "./prompt-area";
import { HeroTagline } from "./tagline";

export function HeroSection() {
    return (
        <div className="mx-auto w-full px-4 tablet-up:px-8 desktop:mt-12 desktop:min-h-[min(40vh, 540px)] desktop:pt-4">
            <div className="text-center desktop:pt-11">
                <h1 className="font-display text-[32px] font-normal leading-[32px] tracking-[-1.92px] text-text-heading desktop:text-[64px] desktop:leadig-[100%] desktop:tracking-[-0.06em]">
                    What will you build?
                </h1>

                <div className="relative mx-auto mt-8 h-[22px] w-full max-w-hero-tagline text-text-muted">
                    <HeroTagline />
                </div>
                <div className="mx-auto mt-[33px] w-full max-w-hero-category desktop:max-w-hero-prompt-desktop">
                    <HeroPromptArea />
                </div>
            </div>
        </div>
    )
} 