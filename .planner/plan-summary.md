# Implementation Plan: My Digital Reputation — Phase 1 MVP

**Project:** MyDigitalReputation | **Generated:** 2026-04-03 | **Steps:** 43 | **Est. Time:** ~21h solo
**With Team (3 agents):** ~9h | **Critical Path:** ~5h 10min

## Dependency Graph

```
M0 Foundation ──→ M1 Backend ──→ M5 Integration
      │                │              ↑
      │                ↓              │
      └──→ M3 Public Pages ──────────┘
                                     │
M2 Scan Engine ──────────────────────┘
                                     │
      M4 Dashboard ──────────────────┘
                                     │
                               M6 Polish
```

## Milestones

### M0: Foundation (6 steps, ~145min)
Project setup, schema, auth, layouts.
- [ ] STEP-GLB-001: Init Next.js + shadcn/ui ⏱️ ~15min 🟢
- [ ] STEP-GLB-002: Install Convex ⏱️ ~15min 🟢
- [ ] STEP-GLB-003: Define full schema (6 tables) ⏱️ ~30min 🟡
- [ ] STEP-GLB-004: Install Clerk auth ⏱️ ~20min 🟢
- [ ] STEP-GLB-005: Dashboard layout (sidebar + header) ⏱️ ~40min 🟡
- [ ] STEP-GLB-006: Public layout (navbar + footer) ⏱️ ~25min 🟢

### M1: Backend Core (8 steps, ~190min)
All Convex functions for users, scans, profiles, alerts, projects, platforms.
- [ ] STEP-BKD-001: Users functions ⏱️ ~20min 🟢
- [ ] STEP-BKD-002: Scans functions ⏱️ ~30min 🟡
- [ ] STEP-BKD-003: Profiles functions ⏱️ ~20min 🟢
- [ ] STEP-BKD-004: Projects functions ⏱️ ~20min 🟢
- [ ] STEP-BKD-005: Alerts functions ⏱️ ~15min 🟢
- [ ] STEP-BKD-006: Platforms + seed data ⏱️ ~30min 🟡
- [ ] STEP-BKD-007: Scan trigger action + webhook ⏱️ ~40min 🟠 CRITICAL PATH
- [ ] STEP-BKD-008: Scan timeout cron ⏱️ ~15min 🟢

### M2: Scan Engine (5 steps, ~155min)
FastAPI micro-service + Sherlock + Google + scoring.
- [ ] STEP-SCN-001: Init FastAPI project ⏱️ ~20min 🟢
- [ ] STEP-SCN-002: Sherlock integration ⏱️ ~45min 🟠
- [ ] STEP-SCN-003: Google search scanner ⏱️ ~30min 🔴 HIGH RISK
- [ ] STEP-SCN-004: Webhook sender + scoring ⏱️ ~25min 🟡
- [ ] STEP-SCN-005: Wire scan orchestrator ⏱️ ~35min 🔴 HIGH RISK, CRITICAL PATH

### M3: Public Pages (7 steps, ~225min)
Landing page, scan page, pricing, contact, blog, SEO.
- [ ] STEP-LND-001: Landing page ⏱️ ~45min 🟡
- [ ] STEP-LND-002: Scan page + streaming results ⏱️ ~60min 🟠
- [ ] STEP-LND-003: Scan results page /scan/[id] ⏱️ ~20min 🟢
- [ ] STEP-LND-004: Pricing page ⏱️ ~25min 🟢
- [ ] STEP-LND-005: Contact page + Cal.com ⏱️ ~20min 🟢
- [ ] STEP-LND-006: Blog MDX infrastructure ⏱️ ~35min 🟡
- [ ] STEP-LND-007: SEO metadata + sitemap ⏱️ ~20min 🟢

### M4: Dashboard (8 steps, ~200min)
All authenticated dashboard pages.
- [ ] STEP-DSH-001: Dashboard overview ⏱️ ~35min 🟡
- [ ] STEP-DSH-002: Scans history ⏱️ ~25min 🟢
- [ ] STEP-DSH-003: New scan dialog ⏱️ ~20min 🟢
- [ ] STEP-DSH-004: Profiles management ⏱️ ~30min 🟡
- [ ] STEP-DSH-005: Alerts center ⏱️ ~25min 🟢
- [ ] STEP-DSH-006: Projects page + detail ⏱️ ~30min 🟡
- [ ] STEP-DSH-007: Settings page ⏱️ ~20min 🟢
- [ ] STEP-DSH-008: Alert bell in header ⏱️ ~15min 🟢

### M5: Integration (4 steps, ~105min)
Wire everything together end-to-end.
- [ ] STEP-INT-001: Full scan flow e2e ⏱️ ~45min 🔴 CRITICAL PATH
- [ ] STEP-INT-002: Anonymous scan → account linking ⏱️ ~25min 🟡
- [ ] STEP-INT-003: Project creation from problems ⏱️ ~20min 🟢
- [ ] STEP-INT-004: Clerk → Convex user sync ⏱️ ~15min 🟢

### M6: Polish & Ship (5 steps, ~110min)
Loading states, empty states, toasts, responsive, legal.
- [ ] STEP-POL-001: Loading states + skeletons ⏱️ ~25min 🟢
- [ ] STEP-POL-002: Empty states with CTAs ⏱️ ~20min 🟢
- [ ] STEP-POL-003: Toast notifications ⏱️ ~15min 🟢
- [ ] STEP-POL-004: Responsive + dark mode ⏱️ ~30min 🟡
- [ ] STEP-POL-005: Legal pages + final SEO ⏱️ ~20min 🟢

## Critical Path
STEP-GLB-001 → GLB-003 → BKD-007 → SCN-005 → INT-001
Total: ~5h 10min — any delay on these steps delays everything.

## Risk Map
| Step | Risk | Description | Mitigation |
|------|------|-------------|------------|
| STEP-SCN-003 | 🔴 HIGH | Google blocks automated search | Use Custom Search API ($5/1k queries) |
| STEP-SCN-005 | 🔴 HIGH | Multi-service orchestration | Structured error handling, logging |

## Team Tracks
| Track | Steps | Parallel? |
|-------|-------|-----------|
| Setup | 6 | Partial (GLB-004 + GLB-006 parallel) |
| Backend | 8 | High (BKD-001 through BKD-006 all parallel) |
| Scan Engine | 5 | Sequential |
| Frontend | 20 | High (LND + DSH pages parallel) |
| Integration | 4 | Sequential |

## Design System
- Theme: TBD (user choice at STEP-GLB-001)
- Components: shadcn/ui
- Icons: lucide-react
- Animations: motion/react
