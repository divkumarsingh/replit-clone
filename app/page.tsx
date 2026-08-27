
import { CtaSection } from "@/components/landing/cta/section";
import { AgentSection } from "@/components/landing/agent/section";
import { AboveTheFold } from "@/components/landing/hero/above-the-fold";
import { HeroSection } from "@/components/landing/hero/section";
import { PlatformSection } from "@/components/landing/platform/section";
import { PricingPlanClient } from "@/components/landing/pricing/pricing-plans-client";
import { PricingSection } from "@/components/landing/pricing/section";
import { Footer } from "@/components/layout/footer";
import { NavBar } from "@/components/layout/navbar";
import { TestimonialSection } from "@/components/landing/testimonials/section";
import { getCachedSession } from "@/lib/auth/ cached";

export default async function Home() {
  const session = await getCachedSession();
  const initialUser = session?.user
    ? { name: session.user.name, email: session.user.email } : null;
  return (
    <>
      <NavBar initialUser={initialUser} />
      <main className="min-h-[50vh]">
        <AboveTheFold />
        <AgentSection />
        <PlatformSection />
        <TestimonialSection />
        <PricingSection />
        <CtaSection />
      </main>
      <Footer />
    </>


  );
}
