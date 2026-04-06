import { v } from "convex/values";
import { action } from "./_generated/server";
import { internal } from "./_generated/api";
import { ConvexError } from "convex/values";

export const triggerScan = action({
  args: {
    scanId: v.id("scans"),
    query: v.string(),
  },
  handler: async (ctx, args) => {
    const serviceUrl = process.env.SCAN_SERVICE_URL;
    if (!serviceUrl) throw new ConvexError("SCAN_SERVICE_URL non configuré");

    const webhookSecret = process.env.SCAN_WEBHOOK_SECRET;
    if (!webhookSecret)
      throw new ConvexError("SCAN_WEBHOOK_SECRET non configuré");

    try {
      const response = await fetch(`${serviceUrl}/api/scan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${webhookSecret}`,
        },
        body: JSON.stringify({
          scanId: args.scanId,
          query: args.query,
        }),
      });

      if (!response.ok) {
        await ctx.runMutation(internal.scans.completeScan, {
          scanId: args.scanId,
          score: 0,
          status: "failed",
        });
        throw new ConvexError(
          `Erreur du service de scan: ${response.status}`
        );
      }

      return { triggered: true };
    } catch (error) {
      if (error instanceof ConvexError) throw error;
      await ctx.runMutation(internal.scans.completeScan, {
        scanId: args.scanId,
        score: 0,
        status: "failed",
      });
      throw new ConvexError("Service de scan indisponible");
    }
  },
});
