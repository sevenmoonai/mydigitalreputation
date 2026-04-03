import { v } from "convex/values";
import { action } from "./_generated/server";
import { ConvexError } from "convex/values";

export const triggerScan = action({
  args: {
    scanId: v.id("scans"),
    query: v.string(),
  },
  handler: async (_ctx, args) => {
    const serviceUrl = process.env.SCAN_SERVICE_URL;
    if (!serviceUrl) throw new ConvexError("SCAN_SERVICE_URL non configuré");

    const webhookSecret = process.env.SCAN_WEBHOOK_SECRET;
    if (!webhookSecret)
      throw new ConvexError("SCAN_WEBHOOK_SECRET non configuré");

    const response = await fetch(`${serviceUrl}/api/scan`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scanId: args.scanId,
        query: args.query,
        webhookSecret,
      }),
    });

    if (!response.ok) {
      throw new ConvexError(
        `Erreur du service de scan: ${response.status} ${response.statusText}`
      );
    }

    return { triggered: true };
  },
});
