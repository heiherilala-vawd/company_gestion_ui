---
name: select-with-create
description: >
  Reference select with inline create dialog pattern for React Admin. Covers the
  ReferenceSelectWithCreate wrapper component, SelectWithCreateProvider factory
  functions, and form components with dual-mode behavior (standalone create vs
  inline dialog). Use this when implementing a dropdown that needs inline creation
  of related records, or when adding a new entity factory to the provider.
---

# Select + Create Pattern

## Concept

A reusable pattern that combines a `<ReferenceInput>` / `<SelectInput>` with an inline creation dialog. When the user needs a record that doesn't exist yet, they click a "+" button, fill a form in a dialog, submit it, and the new record is automatically selected in the parent dropdown — all without leaving the current page.

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│  ReferenceSelectWithCreate (wrapper component)          │
│                                                         │
│  ┌──────────────────────────────────────┐  ┌─────────┐ │
│  │  ReferenceInput → SelectInput        │  │ [+] btn │ │
│  └──────────────────────────────────────┘  └────┬────┘ │
│                                                  │      │
│  ┌───────────────────────────────────────────┐   │      │
│  │  Dialog (open= dialogOpen)                │◄──┘      │
│  │  ┌─────────────────────────────────────┐  │         │
│  │  │  FormProvider (react-hook-form)     │  │         │
│  │  │  ┌───────────────────────────────┐  │  │         │
│  │  │  │  {createForm} (child form)    │  │  │         │
│  │  │  └───────────────────────────────┘  │  │         │
│  │  │  [Annuler]  [Créer (submit)]       │  │         │
│  │  └─────────────────────────────────────┘  │         │
│  └───────────────────────────────────────────┘         │
└─────────────────────────────────────────────────────────┘

  SelectWithCreateProvider (factory functions)
  ┌─────────────────────────────────────────┐
  │  renderUserSelect(source, label)        │
  │  renderMaterialSelect(source, label)    │
  │  ... (13 factories)                     │
  └─────────────────────────────────────────┘
```

## Component Breakdown

### 1. `ReferenceSelectWithCreate` (`src/generic/ReferenceSelectWithCreate.tsx`)

The orchestrator. Composes:
- A **`ReferenceInput`** → **`SelectInput`** for picking existing records
- A **`+` IconButton** that opens a **`Dialog`**
- The dialog wraps the child form in a **`FormProvider`** (react-hook-form) and a `<form>` element
- On submit: extracts data (handles `extractionPath` for arrays), promotes `newId` → `id`, calls PUT API (or `dataProvider.create` fallback), refreshes, closes dialog

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `source` | `string` | yes | — | Field source in the form (e.g. `"user_id"`) |
| `reference` | `string` | yes | — | React Admin resource name (e.g. `"users"`) |
| `label` | `string` | no | — | Label for the select and dialog title |
| `optionText` | `string \| (record) => string` | no | — | How to display each option |
| `filter` | `Record` | no | — | Filter for ReferenceInput |
| `sort` | `{field, order}` | no | `{field:'name',order:'ASC'}` | Sort for ReferenceInput |
| `perPage` | `number` | no | `100` | Number of options per page |
| `createUrlEnd` | `string` | no | — | PUT endpoint URL (built via `getMiddleUrl(resource)`) |
| `createForm` | `ReactNode` | no | — | Form component rendered in the dialog |
| `onSuccess` | `(record) => void` | no | — | Callback after successful creation |
| `extractionPath` | `string` | no | — | Dot-path to extract record from array (used inside `<ArrayInput>`) |

### 2. `SelectWithCreateProvider` (`src/generic/SelectWithCreateProvider.tsx`)

A set of factory functions that pre-configure `ReferenceSelectWithCreate` for each entity type. Each factory:

1. Sets `source` (with sensible default), `reference`, `label`, `optionText`
2. Calls `getMiddleUrl(resource)` for `createUrlEnd`
3. Passes the entity's form component with `isCreateForm` prop

All factories follow the signature:
```tsx
export const renderXxxSelect = (source?: string, label?: string) => (
  <ReferenceSelectWithCreate ... />
)
```

### 3. Form Components

Each form component accepts `isCreate` and `isCreateForm` boolean props to switch behavior:

| Mode | `isCreate` | `isCreateForm` | ID field shown |
|------|-----------|----------------|----------------|
| Standalone create page | `true` | `false` | Hidden `id` (generated via `generateId()`) |
| Inline dialog create | `false` | `true` | Visible `newId` (generated via `generateId()`) |
| Edit mode | `false` | `false` | Read-only `id` (from record) |

Some forms accept additional props:
- `souce` (string) — prefix for all field sources (e.g. `"expense."` for nested records)
- `extractionPath` — used by the parent when the form lives inside an `<ArrayInput>`
- `description` — pre-filled default for description fields

## Data Flow

```
1. User clicks [+] → dialogOpen = true
2. User fills form (fields use react-admin's <TextInput> etc.)
3. User clicks "Créer" → form.handleSubmit(onSubmit)
4. onSubmit:
   a. If extractionPath set: extract first element from array
   b. extractedData.id = extractedData.newId (promote temp ID)
   c. delete extractedData.newId
   d. PUT to createUrlEnd with [extractedData]
   e. OR fallback to dataProvider.create(reference, { extractedData })
   f. onSuccess?.(newRecord)
   g. notify('success')
   h. setDialogOpen(false)
   i. refresh() → ReferenceInput re-fetches, new record now in dropdown
   j. methods.reset()
5. User selects the new record in the dropdown
```

## Shared State / Context

No global context. Each `ReferenceSelectWithCreate` instance manages its own:
- `dialogOpen` (useState)
- `methods` (useForm from react-hook-form, local to each dialog)

The `FormProvider` is created inside the dialog so each instance has independent form state.

## Error Handling / Edge Cases

- **Invalid extractionPath**: logs warning, shows error notification, returns early
- **API failure**: catches error, shows `Erreur: ${error.message}` notification
- **No createForm**: if `createForm` prop is not passed, the [+] button is hidden entirely (used for `renderEquipeSelect` which is select-only)
- **No createUrlEnd**: falls back to `dataProvider.create(reference, { extractedData })` (React Admin API)
- **Array context**: forms inside `<ArrayInput>` use `extractionPath` to extract the nested record; the `souce` prop prefixes field names

## Adding a New Entity Type — Checklist

1. **Create the form component** (e.g. `src/features/<area>/<entity>/XxxForm.tsx`):
   - Accept `{ isCreate, isCreateForm, souce?, description?, extractionPath? }` props
   - Show hidden `id` when `isCreate=true`, visible `newId` when `isCreateForm=true`
   - Import `generateId` from utilities

2. **Export a factory** in `SelectWithCreateProvider.tsx`:
   - Import the form
   - Create `renderXxxSelect(source?, label?)` function
   - Pass `createUrlEnd={getMiddleUrl('xxx')}`
   - Pass `<XxxForm isCreateForm />`

3. **Use in parent forms**:
   - Call `renderXxxSelect(source, label)` directly in JSX

## Example

### Form component

```tsx
// src/features/storage/materials/MaterialForm.tsx
import { required, TextInput, SelectInput } from 'react-admin'
import generateId from '../../../utili/utils.tsx'

export default function MaterialForm({ isCreate = false, isCreateForm = false }) {
  return (
    <>
      {isCreate && (
        <TextInput source="id" readOnly defaultValue={generateId()} sx={{ display: 'none' }} />
      )}
      {isCreateForm && <TextInput source="newId" readOnly defaultValue={generateId()} />}
      <TextInput source="name" label="Nom" validate={[required()]} />
      <TextInput source="description" label="Description" multiline rows={3} />
      <SelectInput
        source="unit"
        label="Unité"
        choices={[
          { id: 'KG', name: 'Kilogramme' },
          { id: 'M', name: 'Mètre' },
          { id: 'U', name: 'Unité' },
        ]}
      />
    </>
  )
}
```

### Factory

```tsx
// src/generic/SelectWithCreateProvider.tsx
import MaterialForm from '../features/storage/materials/MaterialForm.tsx'

export const renderMaterialSelect = (source?: string, label?: string) => (
  <ReferenceSelectWithCreate
    source={source ?? 'material_id'}
    reference="materials"
    label={label ?? 'Matériau'}
    optionText="name"
    createUrlEnd={getMiddleUrl('materials')}
    createForm={<MaterialForm isCreateForm />}
  />
)
```

### Usage

```tsx
import { renderMaterialSelect } from '../../../generic/SelectWithCreateProvider.tsx'

// Inside a react-admin <SimpleForm> or <TabbedForm>:
{renderMaterialSelect('material_id', 'Matériau')}
```

## Files

| File | Purpose |
|------|---------|
| `src/generic/ReferenceSelectWithCreate.tsx` | Core wrapper component |
| `src/generic/SelectWithCreateProvider.tsx` | Factory functions for all entity types |
| `src/config/dynamicResources.ts` | URL builders (`getMiddleUrl`) |
| `src/utili/utils.tsx` | UUID generator (`generateId`) |
| `src/features/storage/materials/MaterialForm.tsx` | Example form (simple) |
| `src/features/transversal/usersSetup/UserForm.tsx` | Example form (with nested select) |
| `src/features/money/expenses/ExpenseForm.tsx` | Example form (with `souce` prefix) |
| `src/features/money/travel_expenses/TravelExpenseForm.tsx` | Example form (composition + `souce`) |
