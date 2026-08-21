import { Container } from "@/components/ui/container";
import { platformFeatures } from "@/lib/landing-data";
import { platform } from "os";
import { PlatformCard } from "./card";
import { MobilePlatformSlider } from "./mobile-platform";

export function PlatformSection() {
    return (
        <section className="pb-8 py-16 desktop:pt-[120px] mx-auto">
            <Container className="flex-col items-center justify-center">
                <h2 className="text-center font-display text-[32px] leading-[32px] tracking-[-1.92]
                text-text-agent-heading tablet-up:text-[40px] tablet-up:leading-[40px] tablet-up:tracking-[-2.4px]
                desktop:text-[48px] desktop:leading-none desktop:tracking-[-0.06em]"
                >Powered by the replit Platform</h2>

                <MobilePlatformSlider />
                <div className="mt-12 hidden w-full grid-cols-1 gap-3 tablet-up:grid tablet-up:grid-cols-2 desktop-wide:flex desktop-wide:flex-row desktop-wide:justify-center">
                    {platformFeatures.map((feature) => (
                        <PlatformCard key={feature.id} feature={feature}></PlatformCard>
                    ))}
                </div>

            </Container>
        </section>
    )
}