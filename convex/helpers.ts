import { ActionCtx, QueryCtx } from "./_generated/server";

export const requireUser = async (ctx: ActionCtx | QueryCtx) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
        throw new Error("You are not authorised");
    }
    return user;
};