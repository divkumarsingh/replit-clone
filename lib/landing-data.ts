import type {
    AgentFeatures,
    ExamplePrompt,
    NavGroup,
    NavLink,
    PlatformFeatures,
    PricingPlan,
    ProjectCategory,
    Testimonials,

} from "@/lib/types";

/**
 * Static content for the landing page.
 *
 * Separating data from components is a best practice:
 * - Designers/content folks can edit copy without touching JSX
 * - Components stay focused on layout and behavior
 * - The same data can power tests or CMS integration later
 */

export const topNavLinks: NavLink[] = [
    { label: "Security", href: "/security" },
    { label: "Pricing", href: "#pricing" },
];

export const navGroups: NavGroup[] = [
    {
        title: "Products",
        links: [
            { label: "Agent", href: "/agent" },
            { label: "Design", href: "/design" },
            { label: "Databases", href: "/databases" },
            { label: "Publish Apps", href: "/publish" },
            { label: "Integrations", href: "/integrations" },
            { label: "Mobile", href: "/mobile" },
        ],
    },
    {
        title: "For Work",
        links: [
            {
                label: "Pro",
                href: "/pro",
                description: "Replit for serious builders",
            },
            {
                label: "Enterprise",
                href: "/enterprise",
                description: "Replit with Enterprise-grade security & controls",
            },
        ],
        subsections: [
            {
                title: "Use Cases",
                links: [
                    { label: "Business Apps", href: "/use-cases/business" },
                    { label: "Mobile Apps", href: "/use-cases/mobile" },
                    { label: "Rapid Prototyping", href: "/use-cases/prototyping" },
                ],
            },
            {
                title: "Roles",
                links: [
                    { label: "Enterprise", href: "/roles/enterprise" },
                    { label: "PM", href: "/roles/pm" },
                    { label: "Designers", href: "/roles/designers" },
                    { label: "Operations", href: "/roles/operations" },
                    { label: "Software Developers", href: "/roles/developers" },
                    { label: "SMB Owners", href: "/roles/smb" },
                    { label: "Founders", href: "/roles/founders" },
                ],
            },
        ],
    },
    {
        title: "Resources",
        links: [
            { label: "Documentation", href: "/docs" },
            { label: "Partners", href: "/partners" },
            { label: "Community", href: "/community" },
            { label: "Expert Network", href: "/experts" },
            { label: "Customer Stories", href: "/stories" },
            { label: "Gallery", href: "/gallery" },
            { label: "Blog", href: "/blog" },
            { label: "News", href: "/news" },
            { label: "Vibecon", href: "/vibecon", accent: true },
        ],
    },
];

export const projectCategories: ProjectCategory[] = [
    { id: "website", label: "Website", icon: "website" },
    { id: "mobile", label: "Mobile", icon: "mobile" },
    { id: "design", label: "Design", icon: "design" },
    { id: "slides", label: "Slides", icon: "slides" },
    { id: "animation", label: "Animation", icon: "animation" },
    { id: "data", label: "Data Visualization", icon: "data" },
    { id: "game", label: "3D Game", icon: "game" },
    { id: "document", label: "Document", icon: "document" },
    { id: "spreadsheet", label: "Spreadsheet", icon: "spreadsheet" },
];

export const examplePromptSets: ExamplePrompt[][] = [
    [
        {
            label: "Beginner running tracker",
            text: "A fitness tracking app for beginner runners that logs workouts, tracks distance and time, and shows monthly progress",
        },
        {
            label: "Fitness app onboarding wireframe",
            text: "A wireframe for the onboarding flow of a personal fitness tracking app that introduces features like workout logging, goal setting, and progress tracking",
        },
        {
            label: "Checkout flow prototype",
            text: "A clickable checkout flow prototype for an e-commerce clothing store to test the purchase experience with users",
        },
    ],
    [
        {
            label: "B2B project management app",
            text: "A project management web app for a small B2B SaaS startup team to track tasks, assign owners, set deadlines, and view progress across projects",
        },
        {
            label: "Freelance client portal",
            text: "A client portal for a freelance design business where customers can submit requests, upload files, and track the status of their projects",
        },
        {
            label: "AI sales assistant",
            text: "An AI sales assistant web app for a small SaaS company that drafts and sends personalized outreach emails to potential customers",
        },
    ],
    [
        {
            label: "SaaS hero animation",
            text: "A simple looping hero animation for a SaaS website homepage that shows team members collaborating on shared tasks",
        },
        {
            label: "Startup pitch explainer",
            text: "An animated explainer video for a startup pitch illustrating the problem and the product solution",
        },
        {
            label: "SaaS KPI dashboard",
            text: "A SaaS KPI dashboard showing user growth, churn rate, and retention trends over time",
        },
    ],
];

export const heroTaglines = [
    "Turn ideas into apps in minutes — no coding needed",
    "You can always make changes later.",
    "Your first prompt is free. No credit consumption.",
];

const AVATAR_BASE =
    "https://replit.com/cdn-cgi/image/width=256,quality=80,format=auto/public/images/lox/social-proof";

export const agentFeatures: AgentFeatures[] = [
    {
        id: "canvas",
        eyebrow: "Infinite Canvas",
        title: "Design Freely",
        description:
            "Introducing a new space that allows you to explore and tweak designs visually, and then apply them directly to your app.",
        variant: "canvas",
    },
    {
        id: "parallel",
        eyebrow: "Parallel Agents",
        title: "Move faster",
        description:
            "Parallel Agents run tasks together, keeping progress visible. Handle auth, database, and design seamlessly.",
        variant: "parallel",
    },
    {
        id: "artifacts",
        eyebrow: "Multiple Artifacts",
        title: "Ship Anything",
        description:
            "Create mobile and web apps, landing pages, and videos in one project with shared design. Build everything as your project scales without context switching.",
        variant: "artifacts",
    },
    {
        id: "teams",
        eyebrow: "Support for Teams",
        title: "Build together",
        description:
            "Your team can focus on planning your app while the Agent handles all the messy coordination and execution. Submit requests in any order, and Agent 4 intelligently sequences them and executes in the best order.",
        variant: "teams",
    },
];

export const platformFeatures: PlatformFeatures[] = [
    {
        id: "agent",
        eyebrow: "Agent chat",
        title: "Describe it. Publish it.",
        description:
            "Describe and publish your project. The Agent writes production-ready code, evolves it, and stays out of your way.",
        variant: "agent",
    },
    {
        id: "infrastructure",
        eyebrow: "Full stack infrastructure",
        title: "Build & scale your apps easily.",
        description:
            "Built-in services with zero setup- Authentication, Database, Hosting, and Monitoring, enabling you to build fully scalable apps easily and securely from day one.",
        variant: "infrastructure",
    },
    {
        id: "integrations",
        eyebrow: "Integrations",
        title: "Connect to AI & services.",
        description:
            "Enhance your apps with AI and 100+ integrations. Connect to OpenAI, Stripe, Google Workspace, and more in minutes.",
        variant: "integrations",
    },
    {
        id: "enterprise",
        eyebrow: "Enterprise control",
        title: "Secure your apps as they scale.",
        description:
            "Security controls: SSO/SAML, SOC 2, and admin controls. Screening and secure services keep apps safe.",
        variant: "enterprise",
    },
];

export const testimonials: Testimonials[] = [
    {
        id: "databricks",
        quote:
            "By integrating with Lakebase and Databricks Apps, we're combining Replit's capabilities with trusted enterprise data and governance, helping teams move from idea to production faster and more securely than ever.",
        author: "Ali Ghodsi",
        role: "CEO",
        company: "Databricks",
        avatarUrl: `${AVATAR_BASE}/Ali%20Ghodsi.jpg`,
    },
    {
        id: "zillow",
        quote:
            "Agent 4 unlocks true collaboration and real-time learning — now our teams can design and build with our closest partners live, turn instant feedback into measurable wins, and deliver outcomes that delight customers and partners.",
        author: "Doug Rodermund",
        role: "Principal Program Manager",
        company: "Zillow",
        avatarUrl: `${AVATAR_BASE}/Doug%20Roderman.png`,
    },
    {
        id: "gusto",
        quote:
            "Replit Agent 4 is incredible. Its ability to take a one-shot prompt and flesh out the requirements before a full build is unmatched. It requires very little guidance to take a rough concept to a functional prototype.",
        author: "Alex Meyers",
        role: "Principal Product Manager",
        company: "Gusto",
        avatarUrl: `${AVATAR_BASE}/Alex%20Meyers.png`,
    },
    {
        id: "payouts",
        quote:
            "The parallel task execution is a game-changer for us. We have multiple builders working on the same codebase every day, and the ability to submit tasks simultaneously with full visibility before anything merges is exactly how we've wanted to work.",
        author: "Barak Hirchson",
        role: "Co-Founder & Chief AI Officer",
        company: "Payouts.com",
        avatarUrl: `${AVATAR_BASE}/Barak%20Hirchson.png`,
    },
    {
        id: "talkdesk",
        quote:
            "To deliver the world's best customer experience, our internal teams need to work without limits. Replit gives our teams the 'superpowers' to prototype and scale internal solutions in hours rather than weeks.",
        author: "Shauna Geraghty",
        role: "SVP, Global People and Talent",
        company: "Talkdesk",
        avatarUrl: `${AVATAR_BASE}/Shauna%20Geraghty.png`,
    },
    {
        id: "smfl",
        quote:
            "Agent 4 is a game-changer. Multi-user vibe coding via the kanban is a significant milestone for enterprises. It's great for turning individual concepts into team realities and managing tasks through diverse role definitions.",
        author: "Takeshi Fujiwara",
        role: "Director",
        company: "SMFL Digital Lab",
        avatarUrl: `${AVATAR_BASE}/Takeshi%20Fujiwara.png`,
    },
];

export const pricingPlans: PricingPlan[] = [
    {
        id: "starter",
        name: "Starter",
        description: "For exploring what's possible",
        monthlyPrice: 0,
        yearlyPrice: 0,
        ctaLabel: "Sign up",
        ctaHref: "/signup",
        features: [
            "Free daily Agent credits",
            "Built-in database for full-stack apps",
            "Create slides, videos, animations",
            "Publish up to 1 project",
            "Publish private or password-protected deployments",
        ],
    },
    {
        id: "core",
        name: "Replit Core",
        description: "For personal projects & simple apps",
        monthlyPrice: 25,
        yearlyPrice: 18,
        ctaLabel: "Join Replit Core",
        ctaHref: "/app/billing",
        features: [
            "Everything in Starter",
            "$20 of monthly credits",
            "Invite up to 5 collaborators",
            "Work in parallel with up to 2 agents",
            "Publish projects in any region",
            "Unlimited workspaces",
            'Remove "Made with Replit" badge',
            "Replit AI Integrations",
        ],
    },
    {
        id: "pro",
        name: "Replit Pro",
        description: "For commercial and professional builds",
        monthlyPrice: 25,
        yearlyPrice: 23,
        originalPrice: 25,
        ctaLabel: "Upgrade to Pro",
        ctaHref: "/app/billing",
        features: [
            "Everything in Core",
            "$100 monthly credits",
            "Invite up to 15 collaborators",
            "Invite up to 50 viewers",
            "Work in parallel with up to 10 agents",
            "Access to the most powerful models",
            "Database rollbacks for up to 28 days",
        ],
    },
    {
        id: "enterprise",
        name: "Enterprise",
        description: "For enterprise-grade security & controls",
        monthlyPrice: null,
        yearlyPrice: null,
        ctaLabel: "Contact sales",
        ctaHref: "/contact-sales",
        features: [
            "Everything in Pro",
            "Custom seat limits",
            "SSO / SAML",
            "Advanced privacy controls",
            "Design system support",
            "Single-tenant environments",
            "Static outbound IPs",
            "VPC peering",
        ],
    },
];

/** Pro seat tiers for the pricing dropdown. */
export const proSeatTiers = [
    { seats: 100, monthly: 100, yearly: 90 },
    { seats: 300, monthly: 300, yearly: 278 },
    { seats: 500, monthly: 500, yearly: 463 },
    { seats: 1000, monthly: 1000, yearly: 900 },
    { seats: 2500, monthly: 2500, yearly: 2125 },
    { seats: 4000, monthly: 4000, yearly: 3200 },
];

export const footerColumns: NavGroup[] = [
    {
        title: "Handy Links",
        links: [
            { label: "Vibe Coding 101", href: "/vibe-coding" },
            { label: "How to guides", href: "/guides" },
            { label: "Import from GitHub", href: "/import" },
            { label: "Help", href: "/help" },
            { label: "Status", href: "/status" },
        ],
    },
    {
        title: "Company",
        links: [
            { label: "About us", href: "/about" },
            { label: "Brand", href: "/brand" },
            { label: "Certifications", href: "/certifications" },
            { label: "Careers", href: "/careers" },
            { label: "Partnerships", href: "/partnerships" },
            { label: "Education", href: "/education" },
            { label: "Startups", href: "/startups" },
            { label: "Race to Revenue", href: "/race-to-revenue" },
            { label: "Additional resources", href: "/resources" },
        ],
    },
    {
        title: "Legal",
        links: [
            { label: "Terms of service", href: "/terms" },
            { label: "Commercial agreement", href: "/commercial" },
            { label: "Privacy", href: "/privacy" },
            { label: "Subprocessors", href: "/subprocessors" },
            { label: "DPA", href: "/dpa" },
            { label: "Report abuse", href: "/report" },
        ],
    },
    {
        title: "Connect",
        links: [
            { label: "X / Twitter", href: "https://twitter.com/replit" },
            { label: "TikTok", href: "https://tiktok.com/@replit" },
            { label: "Facebook", href: "https://facebook.com/replit" },
            { label: "Instagram", href: "https://instagram.com/replit" },
            { label: "LinkedIn", href: "https://linkedin.com/company/replit" },
        ],
    },
];
