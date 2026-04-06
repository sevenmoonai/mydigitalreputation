import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    name: v.string(),
    email: v.string(),
    plan: v.union(v.literal("free"), v.literal("preventive")),
    credits: v.number(),
    createdAt: v.number(),
    lastScanAt: v.optional(v.number()),
  }).index("by_clerkId", ["clerkId"]),

  scans: defineTable({
    userId: v.optional(v.id("users")),
    query: v.string(),
    status: v.union(
      v.literal("running"),
      v.literal("completed"),
      v.literal("failed")
    ),
    score: v.optional(v.number()),
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
    createdAt: v.number(),
    completedAt: v.optional(v.number()),
  })
    .index("by_userId", ["userId"])
    .index("by_status", ["status"])
    .index("by_status_createdAt", ["status", "createdAt"]),

  profiles: defineTable({
    userId: v.id("users"),
    platform: v.string(),
    url: v.string(),
    status: v.union(
      v.literal("created"),
      v.literal("active"),
      v.literal("optimized")
    ),
    createdAt: v.number(),
  }).index("by_userId", ["userId"]),

  alerts: defineTable({
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
    read: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_userId_read", ["userId", "read"]),

  projects: defineTable({
    userId: v.id("users"),
    status: v.union(
      v.literal("pending_call"),
      v.literal("quoted"),
      v.literal("in_progress"),
      v.literal("completed")
    ),
    contentsToRemove: v.array(
      v.object({
        url: v.string(),
        type: v.string(),
        status: v.string(),
      })
    ),
    price: v.number(),
    callBookedAt: v.optional(v.number()),
    steps: v.array(
      v.object({
        title: v.string(),
        status: v.string(),
        completedAt: v.optional(v.number()),
      })
    ),
    createdAt: v.number(),
  }).index("by_userId", ["userId"]),

  platforms: defineTable({
    name: v.string(),
    url: v.string(),
    category: v.union(
      v.literal("social"),
      v.literal("review"),
      v.literal("directory"),
      v.literal("professional")
    ),
    domainAuthority: v.number(),
    sherlockSupported: v.boolean(),
    autoCreatable: v.boolean(),
    guideUrl: v.optional(v.string()),
  }).index("by_category", ["category"]),
});
