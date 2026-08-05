# Component Standard

This document defines the standard implementation contract for the most reused UI primitives in GMU CRM.

## 1. Card component

### Standard card
- Width: fluid
- Height: auto
- Radius: 20px
- Padding: 24px
- Border: 1px solid #ECECEC
- Background: #FFFFFF
- Shadow: Shadow 01
- Hover: lift 2px and Shadow 02

### Card variants
- Default
- Interactive
- Statistic
- Chart
- Detail

### Required props
- title
- subtitle
- action
- children
- loading
- empty
- variant

### Source candidates
- [src/components/dashboard-ui/KPICard.jsx](src/components/dashboard-ui/KPICard.jsx)
- [src/components/dashboard/DashboardCard.jsx](src/components/dashboard/DashboardCard.jsx)
- [src/features/leads/components/details/DetailSectionCard.jsx](src/features/leads/components/details/DetailSectionCard.jsx)

---

## 2. KPI card standard

### Layout
- Height: 128px
- Radius: 20px
- Padding: 24px
- Header gap: 16px
- Icon container: 44x44
- Icon size: 20px
- Value font: 32px / 700
- Title font: 14px / 600
- Trend font: 12px / 600
- Border: 1px solid #ECECEC
- Background: #FFFFFF

### Grid rules
- Desktop: 4 columns
- Laptop: 2 columns
- Tablet: 2 columns
- Mobile: 1 column
- Gap: 24px

### Source candidates
- [src/components/dashboard-ui/KPICard.jsx](src/components/dashboard-ui/KPICard.jsx)
- [src/features/telecaller/components/kpi/KPISection.jsx](src/features/telecaller/components/kpi/KPISection.jsx)

---

## 3. Table standard

### Enterprise table specification
- Header height: 48px
- Row height: 56px
- Padding: 16px
- Column gap: 12px
- Action width: 120px
- Checkbox width: 40px
- Pagination: shared
- Search: shared
- Filters: shared
- Hover: #F8FAFC
- Selected: #FDF2F8
- Loading: shared skeleton
- Empty: shared empty state

### Required behavior
- Sticky header
- Consistent row border
- Shared pagination bar
- Shared empty state
- Shared row selection semantics

### Source candidate
- [src/components/table/DataTable.jsx](src/components/table/DataTable.jsx)

---

## 4. Badge and status standard

- Radius: 9999px
- Height: 24px
- Padding: 8px 10px
- Font size: 12px
- Weight: 600

### Status variants
- Success
- Warning
- Neutral
- Error

### Source candidate
- [src/components/table/StatusBadge.jsx](src/components/table/StatusBadge.jsx)

---

## 5. Empty state and skeleton standard

### Empty state
- Centered content
- Neutral border
- Neutral background
- Optional CTA

### Skeleton state
- Match the actual component shape
- Use the same spacing and height rules as the live component

---

## 6. Header standard

### Page header
- Title: 28px / 700
- Subtitle: 14px / 500
- Top spacing: 24px
- Bottom spacing: 24px

### Section header
- Title: 20px / 600
- Action row: aligned right

### Source candidate
- [src/components/layout/DashboardNavbar.jsx](src/components/layout/DashboardNavbar.jsx)
