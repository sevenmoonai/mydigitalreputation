import { v } from "convex/values";
import { mutation, query, internalMutation } from "./_generated/server";
import { ConvexError } from "convex/values";

export const startScan = mutation({
  args: {
    query: v.string(),
    userId: v.optional(v.id("users")),
  },
  handler: async (ctx, args) => {
    if (!args.query.trim()) throw new ConvexError("La requête ne peut pas être vide");

    const scanId = await ctx.db.insert("scans", {
      userId: args.userId,
      query: args.query.trim(),
      status: "running",
      createdAt: Date.now(),
    });

    return scanId;
  },
});

export const updateScanResults = internalMutation({
  args: {
    scanId: v.id("scans"),
    googleResults: v.optional(
      v.array(
        v.object({
          url: v.string(),
          title: v.string(),
          snippet: v.string(),
          sentiment: v.string(),
          position: v.number(),
        })
      )
    ),
    platformResults: v.optional(
      v.array(
        v.object({
          platform: v.string(),
          url: v.string(),
          found: v.boolean(),
        })
      )
    ),
    sentiment: v.optional(
      v.object({
        positive: v.number(),
        negative: v.number(),
        neutral: v.number(),
      })
    ),
    problemsDetected: v.optional(
      v.array(
        v.object({
          type: v.string(),
          description: v.string(),
          url: v.optional(v.string()),
          severity: v.string(),
        })
      )
    ),
  },
  handler: async (ctx, args) => {
    const { scanId, ...updates } = args;
    const scan = await ctx.db.get(scanId);
    if (!scan) throw new ConvexError("Scan introuvable");

    const patch: Record<string, unknown> = {};
    if (updates.googleResults) {
      patch.googleResults = [
        ...(scan.googleResults ?? []),
        ...updates.googleResults,
      ];
    }
    if (updates.platformResults) {
      patch.platformResults = [
        ...(scan.platformResults ?? []),
        ...updates.platformResults,
      ];
    }
    if (updates.sentiment) patch.sentiment = updates.sentiment;
    if (updates.problemsDetected) {
      patch.problemsDetected = [
        ...(scan.problemsDetected ?? []),
        ...updates.problemsDetected,
      ];
    }

    await ctx.db.patch(scanId, patch);
  },
});

export const completeScan = internalMutation({
  args: {
    scanId: v.id("scans"),
    score: v.number(),
    status: v.optional(
      v.union(v.literal("completed"), v.literal("failed"))
    ),
  },
  handler: async (ctx, args) => {
    const scan = await ctx.db.get(args.scanId);
    if (!scan) throw new ConvexError("Scan introuvable");

    await ctx.db.patch(args.scanId, {
      status: args.status ?? "completed",
      score: args.score,
      completedAt: Date.now(),
    });

    if (scan.userId) {
      await ctx.db.patch(scan.userId, { lastScanAt: Date.now() });
    }
  },
});

export const getScan = query({
  args: { scanId: v.id("scans") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.scanId);
  },
});

export const getUserScans = query({
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
      .query("scans")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .order("desc")
      .collect();
  },
});

export const linkScanToUser = mutation({
  args: { scanId: v.id("scans") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Non authentifié");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) throw new ConvexError("Utilisateur introuvable");

    const scan = await ctx.db.get(args.scanId);
    if (!scan) throw new ConvexError("Scan introuvable");
    if (scan.userId) throw new ConvexError("Ce scan est déjà rattaché à un compte");

    await ctx.db.patch(args.scanId, { userId: user._id });
  },
});
