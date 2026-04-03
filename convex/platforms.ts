import { v } from "convex/values";
import { query } from "./_generated/server";

export const getAllPlatforms = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("platforms").collect();
  },
});

export const getPlatformsByCategory = query({
  args: {
    category: v.union(
      v.literal("social"),
      v.literal("review"),
      v.literal("directory"),
      v.literal("professional")
    ),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("platforms")
      .withIndex("by_category", (q) => q.eq("category", args.category))
      .collect();
  },
});
