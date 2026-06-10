import { CronExpressionParser } from 'cron-parser'
import { toString as cronToString } from 'cronstrue'

export type CronPreset = 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'yearly' | 'custom'

export interface CronOptions {
  minute: number
  hour: number
  dayOfWeek: number
  dayOfMonth: number
  month: number
}

const DAY_KEYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'] as const
const MONTH_KEYS = [
  'JAN',
  'FEV',
  'MAR',
  'AVR',
  'MAI',
  'JUN',
  'JUL',
  'AOU',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
] as const

export const presetLabels: Record<CronPreset, string> = {
  daily: 'Tous les jours',
  weekly: 'Toutes les semaines',
  biweekly: 'Tous les 15 jours',
  monthly: 'Tous les mois',
  yearly: 'Tous les ans',
  custom: 'Personnalisé',
}

export function presetToCron(preset: CronPreset, opts: CronOptions): string {
  const { minute, hour, dayOfWeek, dayOfMonth, month } = opts
  switch (preset) {
    case 'daily':
      return `0 ${minute} ${hour} * * ?`
    case 'weekly': {
      const dow = DAY_KEYS[Math.min(Math.max(dayOfWeek - 1, 0), 6)]
      return `0 ${minute} ${hour} ? * ${dow}`
    }
    case 'biweekly':
      return `0 ${minute} ${hour} 1,15 * ?`
    case 'monthly':
      return `0 ${minute} ${hour} ${dayOfMonth} * ?`
    case 'yearly':
      return `0 ${minute} ${hour} ${dayOfMonth} ${month} ?`
    case 'custom':
      return `0 ${minute} ${hour} * * ?`
  }
}

export function getPresetFromCron(
  cron: string,
): { preset: CronPreset; opts: Partial<CronOptions> } | null {
  if (!cron || cron === '0 * * * * ?') return null

  const parts = cron.trim().split(/\s+/)
  if (parts.length < 6) return null

  const [, minute, hour, dom, monthStr, dow] = parts
  const opts: Partial<CronOptions> = {
    minute: parseInt(minute, 10) || 0,
    hour: parseInt(hour, 10) || 8,
    dayOfWeek: 1,
    dayOfMonth: 1,
    month: 1,
  }

  if (dow !== '?' && dow !== '*') {
    const idx = DAY_KEYS.findIndex((d) => d === dow)
    if (idx !== -1) {
      opts.dayOfWeek = idx + 1
      return { preset: 'weekly', opts }
    }
  }

  if (dom === '1,15') return { preset: 'biweekly', opts }

  if (dom !== '*' && dom !== '?') {
    opts.dayOfMonth = parseInt(dom, 10) || 1
    if (monthStr !== '*' && monthStr !== '?') {
      const mIdx = MONTH_KEYS.findIndex((m) => m === monthStr)
      opts.month = mIdx !== -1 ? mIdx + 1 : parseInt(monthStr, 10) || 1
      return { preset: 'yearly', opts }
    }
    return { preset: 'monthly', opts }
  }

  return { preset: 'daily', opts }
}

export function isValidCron(expression: string): boolean {
  if (!expression || expression.trim() === '') return false
  try {
    CronExpressionParser.parse(expression, { strict: false })
    return true
  } catch {
    return false
  }
}

export function getCronDescription(expression: string): string {
  try {
    return cronToString(expression, {
      locale: 'fr',
      use24HourTimeFormat: true,
      throwExceptionOnParseError: false,
    })
  } catch {
    return expression
  }
}

export function getNextOccurrences(expression: string, count = 3): Date[] {
  try {
    const parsed = CronExpressionParser.parse(expression, {
      currentDate: new Date(),
    })
    return parsed.take(count).map((d) => d.toDate())
  } catch {
    return []
  }
}

export const DAY_LABELS = [
  { value: 1, label: 'Lundi' },
  { value: 2, label: 'Mardi' },
  { value: 3, label: 'Mercredi' },
  { value: 4, label: 'Jeudi' },
  { value: 5, label: 'Vendredi' },
  { value: 6, label: 'Samedi' },
  { value: 7, label: 'Dimanche' },
] as const

export const MONTH_LABELS = [
  { value: 1, label: 'Janvier' },
  { value: 2, label: 'Février' },
  { value: 3, label: 'Mars' },
  { value: 4, label: 'Avril' },
  { value: 5, label: 'Mai' },
  { value: 6, label: 'Juin' },
  { value: 7, label: 'Juillet' },
  { value: 8, label: 'Août' },
  { value: 9, label: 'Septembre' },
  { value: 10, label: 'Octobre' },
  { value: 11, label: 'Novembre' },
  { value: 12, label: 'Décembre' },
] as const
