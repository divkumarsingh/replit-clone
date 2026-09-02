import { LargeNumberLike } from "crypto";


export type AgentActionStep = {
    type: "action",
    label: string;
    path?: string;
    status?: "running" | "done";
}

export type AgentTextStep = {
    type: "text";
    content: string;
};

export type AgentStep = AgentActionStep | AgentTextStep;

export type AgentFileWriteSnapshot = {
    path: string;
    content: string;
    language: string;
    status: "streaming" | "done"
};
export type AgentMessageMetadata = {
    steps?: AgentStep[];
    fileWrites?: AgentFileWriteSnapshot[];
    presentedArtifactId: string;
    previewVersion?: number;
    buildValid: boolean;
    planQuestion?: {
        question: string;
        options: string[]
    };
    planCompleted?: boolean;
    attachements?: Array<{
        name: string;
        path: string;
        mimeType: string | null;
        sizeBytes: number
    }>;
}

export type AgentStreamEvent =
    | { type: "status"; phase: "working"; actionCount: number }
    | { type: "action"; label: string; path?: string; status?: "running" | "done" }
    | {
        type: "file_write",
        path: string;
        content: string;
        language: string;
        status: "streaming" | "done"
    }
    | { type: "text"; content: string; delta?: boolean }
    | { type: "text_delta"; content: string }
    | { type: "plan_question"; question: string; options: string[] }
    | { type: "plan_completed" }
    | {
        type: "done",
        messageId: string;
        summary: string;
        previewVersion: number;
        steps: AgentStep[];
        fileWrites: AgentFileWriteSnapshot[];
        presentedArtifactId?: string;
        buildValid?: boolean;
        planQuestion?: { question: string; option: string[] }
    }
    | { type: "error"; message: string }

export type AgentRunResult = {
    summary: string;
    steps: AgentStep[];
    fileWrites: AgentFileWriteSnapshot[];
    previewVersion: number;
    presentedArtifactId: string;
    buildValid: boolean;
    planQuestions?: { question: string; options: string[] };
    planCompleted?: boolean
};