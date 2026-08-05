# Component Migration Map

This document maps current UI implementations to the target shared system.

## 1. Existing to target mapping

| Existing implementation | Target component | Priority |
| --- | --- | --- |
| [src/components/dashboard-ui/KPICard.jsx](src/components/dashboard-ui/KPICard.jsx) | Shared KPI card | High |
| [src/features/telecaller/components/kpi/KPISection.jsx](src/features/telecaller/components/kpi/KPISection.jsx) | Shared KPI card | High |
| [src/components/table/DataTable.jsx](src/components/table/DataTable.jsx) | Shared enterprise table | High |
| [src/components/table/StatusBadge.jsx](src/components/table/StatusBadge.jsx) | Shared badge system | Medium |
| [src/components/layout/ReusableFilterDrawer.jsx](src/components/layout/ReusableFilterDrawer.jsx) | Shared filter shell | Medium |
| [src/components/layout/DashboardShell.jsx](src/components/layout/DashboardShell.jsx) | Shared page shell | High |

---

## 2. Migration guidance

### KPI migration
- Replace feature-specific KPI markup with the shared KPI component.
- Enforce a single height, radius, padding, and icon treatment.

### Table migration
- Move all table implementations to the shared table shell.
- Keep feature-specific rendering logic in the row/cell layer, not in the shell.

### Card migration
- Consolidate card wrappers under one card primitive.
- Use the standard spacing, shadow, and border values everywhere.

### Layout migration
- Adopt the shared dashboard blueprint for admin and telecaller pages.
- Remove local spacing overrides that create visual drift.

---

## 3. Suggested ownership

- UI layer: cards, tables, inputs, badges, typography, spacing, layout shell
- Dashboard layer: page composition and business logic
- Features layer: data, server state, and feature-specific behavior only
