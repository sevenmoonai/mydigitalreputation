import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { ConvexError } from "convex/values";

export const createProject = mutation({
  args: {
    contentsToRemove: v.array(
      v.object({
        url: v.string(),
        type: v.string(),
        status: v.string(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Non authentifié");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) throw new ConvexError("Utilisateur introuvable");

    return await ctx.db.insert("projects", {
      userId: user._id,
      status: "pending_call",
      contentsToRemove: args.contentsToRemove,
      price: 0,
      steps: [],
      createdAt: Date.now(),
    });
  },
});

export const getUserProjects = query({
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
      .query("projects")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .order("desc")
      .collect();
  },
});

export const getProject = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Non authentifié");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) throw new ConvexError("Utilisateur introuvable");

    const project = await ctx.db.get(args.projectId);
    if (!project || project.userId !== user._id)
      throw new ConvexError("Projet introuvable ou accès non autorisé");

    return project;
  },
});

export const updateProjectStatus = mutation({
  args: {
    projectId: v.id("projects"),
    status: v.union(
      v.literal("pending_call"),
      v.literal("quoted"),
      v.literal("in_progress"),
      v.literal("completed")
    ),
    price: v.optional(v.number()),
    callBookedAt: v.optional(v.number()),
    steps: v.optional(
      v.array(
        v.object({
          title: v.string(),
          status: v.string(),
          completedAt: v.optional(v.number()),
        })
      )
    ),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Non authentifié");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) throw new ConvexError("Utilisateur introuvable");

    const project = await ctx.db.get(args.projectId);
    if (!project || project.userId !== user._id)
      throw new ConvexError("Projet introuvable ou accès non autorisé");

    const patch: Record<string, unknown> = { status: args.status };
    if (args.price !== undefined) patch.price = args.price;
    if (args.callBookedAt !== undefined) patch.callBookedAt = args.callBookedAt;
    if (args.steps !== undefined) patch.steps = args.steps;

    await ctx.db.patch(args.projectId, patch);
  },
});
