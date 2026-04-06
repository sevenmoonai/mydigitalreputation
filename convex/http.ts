import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";

const http = httpRouter();

http.route({
  path: "/api/scan-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const webhookSecret = process.env.SCAN_WEBHOOK_SECRET;
    if (!webhookSecret) {
      return new Response("Server misconfigured", { status: 500 });
    }

    const authHeader = request.headers.get("Authorization");
    if (!authHeader || authHeader !== `Bearer ${webhookSecret}`) {
      return new Response("Unauthorized", { status: 401 });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let body: any;
    try {
      body = await request.json();
    } catch {
      return new Response("Invalid JSON", { status: 400 });
    }

    const scanId = body?.scanId as string | undefined;
    const type = body?.type as "results" | "complete" | "error" | undefined;

    if (!scanId || !type) {
      return new Response("Missing scanId or type", { status: 400 });
    }

    try {
      const typedScanId = scanId as Id<"scans">;

      if (type === "results") {
        await ctx.runMutation(internal.scans.updateScanResults, {
          scanId: typedScanId,
          googleResults: body.googleResults,
          platformResults: body.platformResults,
          sentiment: body.sentiment,
          problemsDetected: body.problemsDetected,
        });
      } else if (type === "complete") {
        await ctx.runMutation(internal.scans.completeScan, {
          scanId: typedScanId,
          score: (body.score as number) ?? 0,
          status: "completed",
        });
      } else if (type === "error") {
        await ctx.runMutation(internal.scans.completeScan, {
          scanId: typedScanId,
          score: 0,
          status: "failed",
        });
      }

      return new Response("OK", { status: 200 });
    } catch {
      return new Response("Internal error", { status: 500 });
    }
  }),
});

export default http;
