import { AccountIcon, BillingIcon, SettingsIcon, TrashIcon } from "./user-area-icons";

export const userAreaTabs = [
    { label: "Account", href: "/app/account", icon: AccountIcon },
    { label: "Billing", href: "/app/billing", icon: BillingIcon },
    { label: "Setting", href: "/app/setting", icon: SettingsIcon },
    { label: "Account", href: "/app/trash", icon: TrashIcon }

] as const;