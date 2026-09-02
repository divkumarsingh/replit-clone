import type { ArtifactType, ArtifactStatus } from "./generated/prisma/client";
import type { AgentMessageMetadata } from "./agent/types";
import type { PublishVisibility } from "./publish/visibility";
import type { ProjectCategory } from "./types";
import { StringNullableFilter } from "./generated/prisma/commonInputTypes";
import { ProjectSecretOmit, StripeEventDelegate } from "./generated/prisma/models";
import { StringFieldRefInput } from "./generated/prisma/internal/prismaNamespace";
import { getDefaultSettings } from "http2";

export type ProjectSort = "last_opened" | "last_updated" | "name";
export type ProjectBuilderFilter = "all" | ArtifactType;

export type AppProjectDeployment = {
    url: string;
    visibility: PublishVisibility;
    publishedAt: string;
}

export type AppProject = {
    id: string;
    name: string;
    slug: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    workspaceSlug: string;
    workspaceName: string;
    isPinned: boolean;
    lastOpenedAt: string | null;
    fileCount: number;
    deployment: AppProjectDeployment | null;
    artifacts: {
        id: string;
        type: ArtifactType;
        name: string;
        slug: string;
        status: ArtifactStatus;
    }[]
}

export type AppAgentMessage = {
    id: string;
    role: "user" | "assistant";
    content: string;
    createdAt: string;
    metadata?: AgentMessageMetadata | null;
};

export type AppProjectFile = {
    path: string;
    updatedAt: string;
    artifactId: string | null;
}

export type AppProjectDetail = AppProject & {
    workspaceId: string;
    createdAt: string;
    conversationId: string | null;
    lastActiveArtifactId: string | null;
    message: AppAgentMessage[];
    files: AppProjectFile[];
    planMode: boolean;
    deployment: {
        url: string;
        visibility: PublishVisibility;
        publishedAt: string;
    } | null
};

export type AppTrashedProject = AppProject & {
    deletedAt: string;
};

export const buildFilterOptions: {
    value: ProjectBuilderFilter;
    label: string;
}[] = [
        { value: "all", label: "Any build type" },
        { value: "WEB_APP", label: "Web" },
        { value: "MOBILE_APP", label: "Mobile" },
        { value: "DATA_VIZ", label: "Data" },
        { value: "SLIDES", label: "Slides" },
        { value: "DESIGN", label: "Design" },
        { value: "ANIMATION", label: "Animation" },
        { value: "GAME_3D", label: "3D GAME" },
        { value: "AGENT_AUTOMATION", label: "Agent Automation" },
    ]

export const sortOptions: { value: ProjectSort; label: string }[] = [
    { value: "last_opened", label: "Last opened by you" },
    { value: "last_updated", label: "Last updated by you" },
    { value: "name", label: "Name" },
];

export const categoryToArtifactType: Record<ProjectCategory["id"], ArtifactType> = {
    website: "WEB_APP",
    mobile: "MOBILE_APP",
    design: "DESIGN",
    slides: "SLIDES",
    animation: "ANIMATION",
    document: "AGENT_AUTOMATION",
    game: "GAME_3D",
    data: "DATA_VIZ",
    spreadsheet: "DATA_VIZ"
}

export const artifactTypeLabels: Record<ArtifactType, string> = {
    WEB_APP: "Web app",
    MOBILE_APP: "Mobile app",
    DATA_VIZ: "Data",
    SLIDES: "Slides",
    ANIMATION: "Animation",
    GAME_3D: "3D Game",
    DESIGN: "Design",
    AGENT_AUTOMATION: "Agent"
};

export const artifactTypeToCategoryId: Partial<Record<ArtifactType, ProjectCategory["icon"]>> = {
    WEB_APP: "website",
    MOBILE_APP: "mobile",
    DATA_VIZ: "data",
    SLIDES: "slides",
    DESIGN: "design",
    ANIMATION: "animation",
    GAME_3D: "game",
    AGENT_AUTOMATION: "document"
}

export type AppWorkspace = {
    id: string;
    name: string;
    slug: string;
    type: "PERSONAL" | "TEAM";
}