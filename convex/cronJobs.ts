import { internalMutation } from "./_generated/server";

const TEN_MINUTES_MS = 10 * 60 * 1000;

export const markStaleScans = internalMutation({
  args: {},
  handler: async (ctx) => {
    const cutoff = Date.now() - TEN_MINUTES_MS;

    const runningScans = await ctx.db
      .query("scans")
      .withIndex("by_status", (q) => q.eq("status", "running"))
      .collect();

    const staleScans = runningScans.filter((s) => s.createdAt < cutoff);

    for (const scan of staleScans) {
      await ctx.db.patch(scan._id, {
        status: "failed",
        completedAt: Date.now(),
      });
    }

    return { marked: staleScans.length };
  },
});
