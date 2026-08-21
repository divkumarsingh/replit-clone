import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/container";
import { agentFeatures } from "@/lib/landing-data";
import { AgentFeatures } from "@/lib/types";
import Link from "next/link";
import { FeatureCard } from "./feature-card";

export function AgentSection() {
    const [canvas, parallel, artificats, teams] = agentFeatures;
    return (
        <section className="py-12 desktop:py-20">
            <Container className="below-desktop:px-4!">
                <div className="text-center mobile:flex mobile:flex-col mobile:items-center mobile:gap-4">
                    <h1 className="font-display text-[48px] font-normal leading-[48px] tracking-[-2.88px] 
                    text-text-agent-heading desktop:text-[68.92px] desktop:leading-none desktop:tracking-[-4.14px]">
                        Meet <span className="text-replit-orange">Agent 4</span>
                    </h1>
                    <p className="font-display text-2xl leading-[19.92px] tracking-[-0.96] text-text-dim
                    mobile:mt-0 desktop:mt-4 desktop:text-[28px] desktop:leading-tight desktop:tracking-[-0.04em]">
                        Creativity runs on Replit
                    </p>
                </div>
                <div className="mt-6 flex flex-col gap-4 tablet-up:gap-6 desktop:mt-8 desktop:gap-4">
                    <div className="contents tablet-up:grid tablet-up:grid-cols-1 tablet-up:gap-4
                    desktop:grid-cols-[minmax(0,799fr)_minmax(0,533fr)]">
                        <FeatureCard feature={canvas} />
                        <FeatureCard feature={parallel} />
                    </div>
                    <div className="contents tablet-up:grid tablet-up:grid-cols-1 tablet-up:gap-4 desktop:grid-cols-[minmax(0,533fr)_minmax(0,799fr)]">
                        <FeatureCard feature={artificats} />
                        <FeatureCard feature={teams} />
                    </div>
                </div>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
                    <Button href="/agent-4" variant="outline" className="h-[45px] border-[1.5px] px-6">
                        Deep Dive into Agent 4  &rarr;
                    </Button>
                    <Link href="/docs" className="text-sm text-text-agent-heading underline underline-offset-2 hover:text-text-primary">
                        Read the documentation
                    </Link>
                </div>
            </Container>
        </section>
    )
}