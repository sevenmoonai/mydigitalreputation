import { v } from "convex/values";
import { mutation, query, internalMutation } from "./_generated/server";
import { ConvexError } from "convex/values";

export const getUserAlerts = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) return [];

    const limit = args.limit ?? 50;

    return await ctx.db
      .query("alerts")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .order("desc")
      .take(limit);
  },
});

export const getUnreadCount = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return 0;

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) return 0;

    const alerts = await ctx.db
      .query("alerts")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .collect();

    return alerts.filter((a) => !a.read).length;
  },
});

export const markAlertRead = mutation({
  args: { alertId: v.id("alerts") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Non authentifié");

    const alert = await ctx.db.get(args.alertId);
    if (!alert) throw new ConvexError("Alerte introuvable");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user || alert.userId !== user._id)
      throw new ConvexError("Accès non autorisé");

    await ctx.db.patch(args.alertId, { read: true });
  },
});

export const markAllAlertsRead = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Non authentifié");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) throw new ConvexError("Utilisateur introuvable");

    const unreadAlerts = await ctx.db
      .query("alerts")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .collect();

    for (const alert of unreadAlerts) {
      if (!alert.read) {
        await ctx.db.patch(alert._id, { read: true });
      }
    }
  },
});

export const createAlert = internalMutation({
  args: {
    userId: v.id("users"),
    type: v.union(
      v.literal("new_mention"),
      v.literal("negative_content"),
      v.literal("profile_change"),
      v.literal("score_change")
    ),
    source: v.string(),
    title: v.string(),
    url: v.optional(v.string()),
    severity: v.union(
      v.literal("info"),
      v.literal("warning"),
      v.literal("critical")
    ),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("alerts", {
      userId: args.userId,
      type: args.type,
      source: args.source,
      title: args.title,
      url: args.url,
      severity: args.severity,
      read: false,
      createdAt: Date.now(),
    });
  },
});
