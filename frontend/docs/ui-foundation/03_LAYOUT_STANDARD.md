# Layout Standard

This document defines the standard page structure and shell behavior for GMU CRM.

## 1. Global shell

The application shell should remain centered around:
- [src/components/layout/DashboardShell.jsx](src/components/layout/DashboardShell.jsx)

### Required shell structure
- Sidebar
- Top navbar
- Main content area
- Page container

### Shell spacing rules
- Outer padding: 24px mobile, 32px desktop
- Section gap: 24px
- Card gap: 20px

---

## 2. Dashboard blueprint

Every dashboard-style page should follow this layout pattern unless a feature has a specific business reason to deviate.

```text
Dashboard Page
├── Page Header
├── Action Bar
├── KPI Grid
├── Analytics Grid
├── Primary Table
└── Recent Activity
```

### Page header rules
- Title on the left
- Optional action buttons on the right
- Consistent spacing above and below

### Action bar rules
- Search and filters shared
- Secondary actions grouped correctly
- No isolated custom spacing patterns

### KPI grid rules
- 4 columns desktop
- 2 columns tablet
- 1 column mobile
- Consistent card height

### Analytics grid rules
- Two-column responsive grid for charts and summaries
- Cards should share a unified shell

### Primary table rules
- Always use the shared table shell
- Keep pagination and empty state consistent

---

## 3. Section composition rules

Each page should use the same section hierarchy:
- Page header
- Section header
- Section content
- Section footer if needed

### Section spacing
- Top gap: 24px
- Inner gap: 20px
- Bottom gap: 24px

---

## 4. Responsive layout rules

- Mobile: stacked layout, single-column cards
- Tablet: two-column sections where appropriate
- Desktop: standard dashboard grid with consistent gutters

No page should use custom negative margins or local spacing values that break the shared layout system.
