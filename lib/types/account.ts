
export type ConnectedAccount = {
    provider: string;
    providerAccountId: string;
}

export type AuthNavUser = {
    name: string | null;
    email: string | null;
};

export type AuthMode = "login" | "register";

export type OAuthProvider = "google" | "github";

export type AccountProfile = {
    id: string;
    name: string | null;
    email: string | null;
    username: string | null;
    image: string | null;
    emailVerified: boolean;
    createdAt: string;
    connectedAccounts: ConnectedAccount[];

};