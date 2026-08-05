# Duplication Report

This report highlights the largest duplication risks for the UI migration.

## 1. High-priority duplicates

### KPI implementations
- [src/components/dashboard-ui/KPICard.jsx](src/components/dashboard-ui/KPICard.jsx)
- [src/features/telecaller/components/kpi/KPISection.jsx](src/features/telecaller/components/kpi/KPISection.jsx)

### Table implementations
- [src/components/table/DataTable.jsx](src/components/table/DataTable.jsx)
- Feature-specific table components under [src/features](src/features)

### Card wrapper variations
- Dashboard cards in [src/components/dashboard](src/components/dashboard)
- Detail cards in [src/features](src/features)

## 2. Merge recommendations

- Merge KPI implementations into one shared component.
- Merge table implementations into one shared table shell.
- Standardize card wrappers under one base card component.
- Remove page-local styling where it duplicates the shared shell.

## 3. Migration priority

1. KPI cards
2. Tables
3. Card wrappers
4. Layout shell consistency
5. Typography and spacing normalization
