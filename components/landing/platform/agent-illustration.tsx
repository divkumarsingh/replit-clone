
export function PlatformAgentIllustration() {
    return (
        <div className=" relative h-[244px] w-[272px]">
            <div className="  absolute bottom-[-9px] left-5 size-[250px] rounded-full border-[1.5px] border-dashed border-replit-orange" />
            <div className=" absolute left-[45px] top-0 flex h-[50px] w-[162px] items-center gap-1 rounded-[7px] 
                border border-[#191818] bg-white px-2.5 py-2 font-display text-[10.4px] tracking-wide text-[#191818]">
                Make my Idea true
                <span className="h-3 w-px bg-[#191818]" aria-hidden />
            </div>
            <div className="absolute bottom-[94px] left-[183px] flex h-[38px] w-[89px] items-center
            justify-center gap-1 rounded-[7px] bg-replit-orange px-3 font-display text-[10.4px] tracking-[-0.03em] text-white">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" />
                    <ellipse
                        cx="8"
                        cy="8"
                        rx="3.5"
                        ry="7"
                        stroke="currentColor"
                        strokeWidth="1.2"
                    />
                    <path d="M1 8h14" stroke="currentColor" strokeWidth="1.2" />
                </svg>
                Publish
            </div>

            <div className="absolute bottom-0 left-0 flex h-[41px] w-[88px] items-center justify-center gap-1 rounded-md border border-[#191818] bg-white px-2 font-display text-[10.4px] tracking-[-0.03em] text-[#191818]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.2" />
                    <path
                        d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                    />
                </svg>
                Agent
            </div>
        </div>

    )
}