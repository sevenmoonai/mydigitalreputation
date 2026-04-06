/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as alerts from "../alerts.js";
import type * as cronJobs from "../cronJobs.js";
import type * as crons from "../crons.js";
import type * as http from "../http.js";
import type * as platforms from "../platforms.js";
import type * as profiles from "../profiles.js";
import type * as projects from "../projects.js";
import type * as scanEngine from "../scanEngine.js";
import type * as scans from "../scans.js";
import type * as seed from "../seed.js";
import type * as users from "../users.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  alerts: typeof alerts;
  cronJobs: typeof cronJobs;
  crons: typeof crons;
  http: typeof http;
  platforms: typeof platforms;
  profiles: typeof profiles;
  projects: typeof projects;
  scanEngine: typeof scanEngine;
  scans: typeof scans;
  seed: typeof seed;
  users: typeof users;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
