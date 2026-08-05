# UI Foundation Specification

This document is the shared design contract for the GMU CRM UI. It replaces ad-hoc component styling with a single system that can be implemented consistently across admin, telecaller, and feature modules.

## 1. Design token baseline

Source of truth: [src/app/globals.css](src/app/globals.css)

### Color
- Primary: #5C1D24
- Primary hover: #7A1F2B
- Accent gold: #D1A14E
- Background: #FAFAFA
- Surface: #FFFFFF
- Border: #ECECEC
- Text primary: #111827
- Text secondary: #64748B

### Typography
- Sans: Outfit, sans-serif
- Display: 32px / 700
- Page title: 28px / 700
- Section title: 20px / 600
- Card title: 16px / 600
- Body: 14px / 500
- Caption: 12px / 500
- Table label: 10px / 600

### Spacing scale
- 4px
- 8px
- 12px
- 16px
- 20px
- 24px
- 32px
- 40px
- 48px

### Radius scale
- Small: 12px
- Medium: 16px
- Large: 20px
- Pill: 9999px

### Shadow scale
- Shadow 01: 0 8px 24px rgba(15, 23, 42, 0.05)
- Shadow 02: 0 12px 32px rgba(15, 23, 42, 0.07)
- Shadow 03: 0 18px 40px rgba(15, 23, 42, 0.1)

### Density rules
- Compact: 112px KPI height, tighter table padding
- Standard: 128px KPI height, standard table padding
- Comfortable: 160px KPI height, more breathing room for detail views

---

## 2. Shared component rules

All components must use the shared tokens above. No component should introduce a new radius, shadow, or spacing value without updating this spec.

### Component contract requirements
- Cards must use one of the approved radius values only.
- Every page must use the same shell spacing model.
- Tables must use shared header, row, and empty-state patterns.
- Buttons and pills must use the pill radius.

---

## 3. Loading and empty states

Every section must support:
- Loading skeleton
- Empty state
- Error state

### Default empty state
- Centered content
- Neutral border
- Neutral background
- Clear CTA if available

### Default loading state
- Skeleton card or skeleton table
- Match component dimensions exactly

---

## 4. Responsive rules

- Mobile: 1-column layout
- Tablet: 2-column layout
- Laptop: 2-column or 3-column layout depending on section
- Desktop: 4-column KPI grid and standard two-column analytics layout

---

## 5. Implementation policy

- UI owns cards, buttons, inputs, tables, typography, spacing, and shells.
- Dashboard owns page logic and business rules.
- Features own data and feature-specific state only.

This boundary prevents UI duplication and keeps the system maintainable.
