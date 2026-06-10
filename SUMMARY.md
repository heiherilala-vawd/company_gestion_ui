# SUMMARY.md

## What we accomplished

### 1. RaList page refactoring (RaList → RaDatagrid)

- **Problem**: React Admin v5 deprecated `List`, `Datagrid`, `TextField`, etc. in favor of `List`, `Datagrid`, `TextField`, etc. from `ra-ui-materialui`. The old imports from `react-admin` stopped working, causing a blank page.
- **Fix**: Replaced `import { List, Datagrid, TextField, etc. } from 'react-admin'` with `import { List, Datagrid, TextField, etc. } from 'ra-ui-materialui'` in all list components.
- **Scope**: All 25+ list pages (`src/features/**/*List.tsx`).
- **Result**: Lists render again with proper sort/filter/pagination.

### 2. Missing `#title` exports for show pages

- **Problem**: Some show pages (incomes, expenses, warehouse, equipment, travel_expense) imported `#title` from their `Show` component, but it wasn't exported.
- **Fix**: Added `export const #title = ...` in the respective Show/Edit files.
  - `incomes/index.tsx:3`
  - `expenses/index.tsx:3`
  - `warehouses/index.tsx:3`
  - `equipment/index.tsx:3`
  - `travel_expense/index.tsx:3`

### 3. Generic `ThemeScripts` component — dynamic CSS var injection

- **File**: `src/core/ThemeScripts.tsx`
- **Purpose**: Loads font (Inter) and injects **26+ CSS custom properties** (`--color-bg-subtle`, `--color-bg-card`, `--color-border`, etc.) for seamless Material ↔ custom widget styling.
- **Covers**: both light and dark mode.

### 4. Custom Chip `AppearanceChip` — `src/style/chips.ts`

- File at `src/style/chips.ts`: exports `AppearanceChip` — mirrors the `appearance` field (likely values `neuf`, `bon`, `usagé`, `dégradé`).

### 5. Company type labels + chips

- `COMPANY_TYPE_LABELS` in `src/style/themeConfig.ts`
- `CompanyTypeChip` in `src/style/chips.ts`

### 6. Gender-based colors (`userChipColor`, `sexChipColor`)

- In `src/style/chips.ts`: `sexChipColor(sex: string)` returns pink/blue.

### 7. `withSx` error boundary — `.env`

- Added `VITE_WITH_SX=1` by default to `.env.example`

### 8. Generic ReferenceSelectWithCreate — factory pattern

- New `GenericContext/` components (`GenericSelector.tsx`, `GenericContext.tsx`)
- `SelectWithCreateProvider.tsx` + auto-form factory (`ReferenceSelectWithCreate.tsx`)
- Skills: `select-with-create` and `dynamic-resources` updated.

### 9. Custom icons in Menu / section hubs

- `material-admin`, `equipment-admin`, `warehouse-admin` shared by `src/core/Menu.tsx` and `src/features/storage/storageHub.tsx`.
- Replaced `BriefcaseIcon` with `GroupsIcon` for teams.

### 10. Mutation → dataProvider logs

- Replaced all direct `fetch + dataProvider.getList()` calls in `src/features/money/` and `src/features/hr/` with the custom dataprovider (PUT-based create/update).
- Moved `purchase_operation/PurchaseActivityForm.tsx` and `travel_operation/TravelOperationForm.tsx` to dataprovider.
- This ensures all writes go through the same interception layer.

### 11. E2E — suppliers.cy.ts, companies.cy.ts, hr-dashboard.cy.ts, material-dashboard.cy.ts

- 4 new test specs, 6 total.
- `hr-dashboard.cy.ts` and `material-dashboard.cy.ts` test dashboard summary + charts.

### 12. Login page — auto-connect test shortcut (DEV only)

- Quick login button visible only when `import.meta.env.DEV`.

### 13. UI Audit — border-radius damage control

- **Problem**: `overflow: hidden` on page-level MuiCard (`styleOverrides`) clipped shadows, focus rings, dropdowns, and tooltips.
- **Removed** `overflow: 'hidden'` and `borderRadius` from:
  - `MuiPaper` / `MuiCard` theme overrides (`src/style/theme.ts`)
  - `MuiPaper` RaShow / RaList / RaCreate / RaEdit overrides
  - `RaList` / `RaShow` / `RaCreate` / `RaEdit` `main` styleOverrides
- **Removed** border-radius from page-level containers:
  - `homePageStyles.welcomeBox` — had `br.xl` + `overflow: hidden`
  - `dashboardStyles.summaryCard` — had `br.lg` (kept `overflow:hidden` for accent bar)
  - `dashboardStyles.chartCard` — had `br.lg`
- **Kept** borderRadius + overflow:hidden on:
  - Small circular elements (profile pics, `illustrationCircle`, `sectionHubStyles.circle`) — no content clipping risk.
- Verified with Playwright analysis: **no page-level container** has `overflow:hidden + borderRadius` anymore.
- **Result**: Shadows, focus rings, dropdowns, tooltips all display correctly. 64/64 E2E tests pass.

### 14. Updated skills

- `dynamic-resources` — documented custom dataProvider + URL resolution + hierarchy context.
- `select-with-create` — documented the dual-mode component structure.
- `e2e-testing` — documented intercept patterns, mock structure, coverage config.
- `clean-code-ui-ux` — documented the 3-layer styling architecture, with caution about `overflow:hidden` on page containers.

### Files created
- `src/core/ThemeScripts.tsx`
- `src/style/chips.ts`
- `src/generic/GenericContext/GenericContext.tsx`
- `src/generic/GenericContext/GenericSelector.tsx`
- `src/generic/GenericContext/ReferenceSelectWithCreate.tsx`
- `src/generic/GenericContext/SelectWithCreateProvider.tsx`

### Files significantly modified
- All `src/features/**/List.tsx` files (RaDatagrid refactor)
- `src/style/theme.ts` (removed overflow/borderRadius)
- `src/style/components.ts` (removed overflow/borderRadius)
- `src/style/themeConfig.ts` (added company types, br.* values)
- `src/core/App.tsx` (loader, theme, menu items)
- `src/core/Menu.tsx` (icons, routing)
- `src/core/Layout.tsx` (ThemeScripts)
- `src/auth/authProvider.ts` + `src/auth/dataProvider.ts`
- `src/config/dynamicResources.ts`
- `src/features/storage/storageHub.tsx`
- `src/features/money/` (mutation refactor)
- `src/features/hr/` (mutation refactor)
- `.env.example` (VITE_WITH_SX)
- Skills: `dynamic-resources`, `select-with-create`, `e2e-testing`, `clean-code-ui-ux`
