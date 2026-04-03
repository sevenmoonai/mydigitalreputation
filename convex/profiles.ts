import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { ConvexError } from "convex/values";

export const getUserProfiles = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) return [];

    return await ctx.db
      .query("profiles")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .collect();
  },
});

export const createProfile = mutation({
  args: {
    platform: v.string(),
    url: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Non authentifié");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) throw new ConvexError("Utilisateur introuvable");
    if (user.credits <= 0)
      throw new ConvexError("Crédits insuffisants pour créer un profil");

    await ctx.db.patch(user._id, { credits: user.credits - 1 });

    return await ctx.db.insert("profiles", {
      userId: user._id,
      platform: args.platform,
      url: args.url,
      status: "created",
      createdAt: Date.now(),
    });
  },
});

export const updateProfileStatus = mutation({
  args: {
    profileId: v.id("profiles"),
    status: v.union(
      v.literal("created"),
      v.literal("active"),
      v.literal("optimized")
    ),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Non authentifié");

    const profile = await ctx.db.get(args.profileId);
    if (!profile) throw new ConvexError("Profil introuvable");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user || profile.userId !== user._id)
      throw new ConvexError("Accès non autorisé");

    await ctx.db.patch(args.profileId, { status: args.status });
  },
});

export const getSuggestedProfiles = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) return [];

    const userProfiles = await ctx.db
      .query("profiles")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .collect();

    const existingPlatforms = new Set(
      userProfiles.map((p) => p.platform)
    );

    const allPlatforms = await ctx.db.query("platforms").collect();

    return allPlatforms
      .filter((p) => !existingPlatforms.has(p.name))
      .sort((a, b) => b.domainAuthority - a.domainAuthority);
  },
});
