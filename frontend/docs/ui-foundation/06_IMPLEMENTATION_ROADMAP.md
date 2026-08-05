# Implementation Roadmap

This roadmap converts the UI foundation specification into an execution plan.

## Phase 1: Foundation alignment
- Finalize token usage in [src/app/globals.css](src/app/globals.css)
- Standardize spacing, radius, and shadow values
- Document the shared component contract

## Phase 2: Shared primitives
- Replace KPI implementations with one shared KPI card
- Standardize table shell and empty/loading states
- Normalize card shells and badges

## Phase 3: Shell and layout migration
- Align all dashboard pages to the shared shell in [src/components/layout/DashboardShell.jsx](src/components/layout/DashboardShell.jsx)
- Apply the dashboard blueprint to admin and telecaller pages

## Phase 4: Incremental feature migration
- Migrate one feature area at a time
- Keep business logic isolated from UI presentation
- Verify visual parity after each migration pass

## Phase 5: Governance
- Enforce component ownership rules
- Prevent new local card or table implementations from being introduced without approval
- Maintain the docs as the living design system
