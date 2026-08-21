
import { PricingPlanClient } from "./pricing-plans-client";
import { Container } from "@/components/ui/container";

export function PricingSection() {
    const proMonthlyPrice = 25;
    return (
        <section id="pricing" className="py-12 desktop:py-20">
            <Container>
                <PricingPlanClient proMonthlyPrice={proMonthlyPrice} />
            </Container>
        </section>
    )
}