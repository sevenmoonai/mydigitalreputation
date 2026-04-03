/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Stub types — replaced by `npx convex dev` when a deployment is configured.
 */
export const api: any = new Proxy(
  {},
  { get: (_t, _p) => new Proxy({}, { get: () => "" }) }
);
export const internal: any = new Proxy(
  {},
  { get: (_t, _p) => new Proxy({}, { get: () => "" }) }
);
