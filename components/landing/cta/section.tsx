import { Button } from "../../ui/Button";
import { Container } from "../../ui/container";

export function CtaSection() {
    return (
        <section className="py-[120px]">
            <Container className="flex flex-col items-center gap-10 text-center">
                <h2 className="font-display text-[42px] font-normal leading-[42px] trackign-[-1.68] text-text-cta-heading">
                    What are you waiting for?
                </h2>
                <Button
                    href="/signup"
                    size="lg"
                    className="h-20 w-full max-w-cta-button font-display text-2xl font-normal ">
                    Get started for Free
                </Button>

            </Container>
        </section>
    )
}