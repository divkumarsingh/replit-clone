import { ReactJsxRuntime } from "next/dist/server/route-modules/app-page/vendored/rsc/entrypoints";
import { HeroSection } from "./section";
import { LogoCloud } from "./logo-cloud";


export function AboveTheFold() {
    return (
        <section className="flex min-h-[calc(100vh-67px)] flex-col desktop:min-h-[calc(100vh-81px)]">
            <div className="flex flex-1 flex-col items-center justify-center desktop:flex-none">
                <HeroSection />
            </div>
            <div className="desktop:mt-auto">
                <LogoCloud />
            </div>
        </section>
    );

}