import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.interval(
  "mark stale scans as failed",
  { minutes: 5 },
  internal.cronJobs.markStaleScans
);

export default crons;
