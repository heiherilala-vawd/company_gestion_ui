---
name: cron-input
description: Replace raw cron text inputs with a visual cron expression builder. Use this skill when creating or editing forms that require cron/schedule frequency input — transforms raw cron text fields into user-friendly preset selectors with human-readable preview, next-occurrence display, and optional expert raw-input mode.
---

## When to use

Use this skill when building or improving any form that has a cron expression / frequency field (`source="frequency"`, label containing "cron" or "fréquence" or "schedule"). Replace raw `<TextInput>` with a visual builder so users don't need to know cron syntax.

## Files to create

| File | Purpose |
|------|---------|
| `src/utili/cronUtils.ts` | Preset definitions, cron generation, validation, human-readable descriptions, next-occurrence computation |
| `src/features/{domain}/{resource}/CronInput.tsx` | React Admin custom input component using `useInput` hook |

## Dependencies

- `cron-parser` — validation and next-occurrence calculation
- `cronstrue` — human-readable cron description (French locale built-in)

```bash
npm install cron-parser cronstrue
```

## cronUtils.ts — Required exports

```typescript
export type CronPreset = 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'yearly' | 'custom'

export interface CronOptions {
  minute: number      // 0-59
  hour: number        // 0-23
  dayOfWeek: number   // 1=Lun..7=Dim
  dayOfMonth: number  // 1-31
  month: number       // 1-12
}

export const presetLabels: Record<CronPreset, string>

export function presetToCron(preset: CronPreset, opts: CronOptions): string
export function getPresetFromCron(cron: string): { preset: CronPreset; opts: Partial<CronOptions> } | null
export function isValidCron(expression: string): boolean
export function getCronDescription(expression: string): string
export function getNextOccurrences(expression: string, count?: number): Date[]
```

## CronInput.tsx — Component contract

The component must:

1. **Accept standard `InputProps`** from react-admin ( `source`, `label`, `validate`, `isRequired`, etc.)
2. **Integrate with react-admin form** via `useInput(props)` — gets `{ field, fieldState, id, isRequired }`
3. **Sync visual state with the raw cron string** — on mount, parse existing cron value using `getPresetFromCron()`; on user interaction, generate cron via `presetToCron()` and call `field.onChange(cron)`
4. **Show preset buttons** — `ToggleButtonGroup` with all 6 presets
5. **Show conditional options** based on preset:
   - Always: hour + minute selectors
   - `weekly`: day-of-week selector
   - `monthly`: day-of-month selector
   - `yearly`: month + day-of-month selectors
   - `custom`: just hour + minute (raw override)
6. **Show human-readable description** — `getCronDescription()` in a Chip
7. **Show next occurrences** — `getNextOccurrences()` as chips
8. **Expert mode toggle** — collapsible raw `<TextField>` showing/syncing the cron expression
9. **Show validation errors** — `fieldState.error` via `<FormHelperText>`

## Cron presets — mapping

| Preset | Cron pattern | User inputs |
|--------|-------------|-------------|
| `daily` | `0 {min} {hour} * * ?` | hour, minute |
| `weekly` | `0 {min} {hour} ? * {DOW}` | hour, minute, dayOfWeek |
| `biweekly` | `0 {min} {hour} 1,15 * ?` | hour, minute |
| `monthly` | `0 {min} {hour} {dom} * ?` | hour, minute, dayOfMonth |
| `yearly` | `0 {min} {hour} {dom} {month} ?` | hour, minute, dayOfMonth, month |
| `custom` | same as daily | hour, minute |

## Integration in a form

Replace:
```tsx
<TextInput source="frequency" label="Fréquence (expression cron)" />
```

With:
```tsx
import CronInput from './CronInput'
// ...
<CronInput source="frequency" label="Fréquence" />
```

## Form validation

```typescript
import { isValidCron } from '../../../utili/cronUtils'

const validateCron = (value: string) =>
  isValidCron(value) ? undefined : 'Expression cron invalide'

<CronInput source="frequency" label="Fréquence" validate={validateCron} />
```

## Style guidelines

- Use MUI `ToggleButtonGroup` + `ToggleButton` for presets
- Use MUI `Select` for option selectors (hour, minute, day, month)
- Use MUI `Chip` for description and next-occurrence badges
- Use `Collapse` for the expert mode toggle
- Keep font sizes small (`0.75rem`–`0.8125rem`) for form density
- Keep `field.value` string as the single source of truth; visual state is derived
