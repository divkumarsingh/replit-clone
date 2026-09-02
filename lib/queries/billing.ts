import { getCachedSession } from "../auth/ cached";
import type { UserBillingFields } from "../billing/entitlement";
import { prisma } from "../prisma";

export async function getUserBillingFields(userId: string): Promise<UserBillingFields | null> {
    return prisma.user.findUnique({
        where: { id: userId },
        select: {
            subscriptionPlan: true,
            subscriptionStatus: true
        }
    })
}