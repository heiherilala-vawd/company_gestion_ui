import { useState, useCallback, useEffect, useRef } from 'react'
import {
  Stack,
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Select,
  MenuItem,
  Collapse,
  TextField,
  FormHelperText,
  alpha,
} from '@mui/material'
import { useInput, InputProps, FieldTitle } from 'react-admin'
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled'
import EventIcon from '@mui/icons-material/Event'
import TuneIcon from '@mui/icons-material/Tune'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import type { CronPreset, CronOptions } from '../../../utili/cronUtils'
import {
  presetLabels,
  presetToCron,
  getPresetFromCron,
  isValidCron,
  getCronDescription,
  getNextOccurrences,
  DAY_LABELS,
  MONTH_LABELS,
} from '../../../utili/cronUtils'
import { transitions, borderRadius as br } from '../../../style/themeConfig'

const PRESETS = ['daily', 'weekly', 'biweekly', 'monthly', 'yearly', 'custom'] as CronPreset[]

const presetIcons: Record<CronPreset, React.ReactNode> = {
  daily: <CalendarMonthIcon sx={{ fontSize: 13 }} />,
  weekly: <CalendarMonthIcon sx={{ fontSize: 13 }} />,
  biweekly: <CalendarMonthIcon sx={{ fontSize: 13 }} />,
  monthly: <CalendarMonthIcon sx={{ fontSize: 13 }} />,
  yearly: <CalendarMonthIcon sx={{ fontSize: 13 }} />,
  custom: <TuneIcon sx={{ fontSize: 13 }} />,
}

type CronInputProps = InputProps & {
  label?: string
}

export default function CronInput(props: CronInputProps) {
  const { field, fieldState, id, isRequired } = useInput(props)
  const [expertMode, setExpertMode] = useState(false)
  const [preset, setPreset] = useState<CronPreset>('daily')
  const [minute, setMinute] = useState(0)
  const [hour, setHour] = useState(8)
  const [dayOfWeek, setDayOfWeek] = useState(1)
  const [dayOfMonth, setDayOfMonth] = useState(1)
  const [month, setMonth] = useState(new Date().getMonth() + 1)

  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true
    const existing = field.value
    if (existing && typeof existing === 'string' && existing.trim()) {
      const parsed = getPresetFromCron(existing)
      if (parsed) {
        setPreset(parsed.preset)
        if (parsed.opts.minute !== undefined) setMinute(parsed.opts.minute)
        if (parsed.opts.hour !== undefined) setHour(parsed.opts.hour)
        if (parsed.opts.dayOfWeek !== undefined) setDayOfWeek(parsed.opts.dayOfWeek)
        if (parsed.opts.dayOfMonth !== undefined) setDayOfMonth(parsed.opts.dayOfMonth)
        if (parsed.opts.month !== undefined) setMonth(parsed.opts.month)
      }
    }
  }, [field.value])

  const buildCron = useCallback(
    (p: CronPreset, opts: Partial<CronOptions>) => {
      const cron = presetToCron(p, {
        minute: opts.minute ?? minute,
        hour: opts.hour ?? hour,
        dayOfWeek: opts.dayOfWeek ?? dayOfWeek,
        dayOfMonth: opts.dayOfMonth ?? dayOfMonth,
        month: opts.month ?? month,
      })
      field.onChange(cron)
    },
    [minute, hour, dayOfWeek, dayOfMonth, month, field],
  )

  const handlePresetChange = (_: React.MouseEvent, newPreset: CronPreset | null) => {
    if (!newPreset) return
    setPreset(newPreset)
    buildCron(newPreset, {})
  }

  const handleHourChange = (v: number) => {
    setHour(v)
    buildCron(preset, { hour: v })
  }

  const handleMinuteChange = (v: number) => {
    setMinute(v)
    buildCron(preset, { minute: v })
  }

  const handleDayOfWeekChange = (v: number) => {
    setDayOfWeek(v)
    buildCron(preset, { dayOfWeek: v })
  }

  const handleDayOfMonthChange = (v: number) => {
    setDayOfMonth(v)
    buildCron(preset, { dayOfMonth: v })
  }

  const handleMonthChange = (v: number) => {
    setMonth(v)
    buildCron(preset, { month: v })
  }

  const handleExpertChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(e.target.value)
  }

  const cronValue = field.value as string
  const valid = cronValue ? isValidCron(cronValue) : false
  const description = cronValue && valid ? getCronDescription(cronValue) : ''
  const nextDates = cronValue && valid ? getNextOccurrences(cronValue, 4) : []

  const hasDayOfWeek = preset === 'weekly'
  const hasDayOfMonth = preset === 'monthly' || preset === 'yearly'
  const hasMonth = preset === 'yearly'

  const renderTimeSelectors = (
    <Stack
      direction="row"
      spacing={1.5}
      alignItems="center"
      sx={{
        p: 1.5,
        borderRadius: br.md,
        bgcolor: (t) => alpha(t.palette.primary.main, 0.04),
      }}
    >
      <AccessTimeFilledIcon sx={{ fontSize: 15, color: 'text.secondary', opacity: 0.6 }} />
      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, minWidth: 48 }}>
        Heure
      </Typography>
      <HourSelect value={hour} onChange={handleHourChange} />
      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 300 }}>
        :
      </Typography>
      <MinuteSelect value={minute} onChange={handleMinuteChange} />
    </Stack>
  )

  const renderOptionSelectors = (
    <Stack spacing={1.5} sx={{ pl: 0.5 }}>
      {hasDayOfWeek && (
        <Stack direction="row" spacing={1.5} alignItems="center">
          <EventIcon sx={{ fontSize: 15, color: 'text.secondary', opacity: 0.6 }} />
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontWeight: 600, minWidth: 48 }}
          >
            Jour
          </Typography>
          <Select
            value={dayOfWeek}
            onChange={(e) => handleDayOfWeekChange(e.target.value as number)}
            size="small"
            sx={{
              minWidth: 140,
              fontSize: '0.8125rem',
              '& .MuiSelect-select': { py: 0.75 },
            }}
          >
            {DAY_LABELS.map((d) => (
              <MenuItem key={d.value} value={d.value}>
                {d.label}
              </MenuItem>
            ))}
          </Select>
        </Stack>
      )}

      {hasMonth && (
        <Stack direction="row" spacing={1.5} alignItems="center">
          <EventIcon sx={{ fontSize: 15, color: 'text.secondary', opacity: 0.6 }} />
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontWeight: 600, minWidth: 48 }}
          >
            Mois
          </Typography>
          <Select
            value={month}
            onChange={(e) => handleMonthChange(e.target.value as number)}
            size="small"
            sx={{
              minWidth: 140,
              fontSize: '0.8125rem',
              '& .MuiSelect-select': { py: 0.75 },
            }}
          >
            {MONTH_LABELS.map((m) => (
              <MenuItem key={m.value} value={m.value}>
                {m.label}
              </MenuItem>
            ))}
          </Select>
        </Stack>
      )}

      {hasDayOfMonth && (
        <Stack direction="row" spacing={1.5} alignItems="center">
          <EventIcon sx={{ fontSize: 15, color: 'text.secondary', opacity: 0.6 }} />
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontWeight: 600, minWidth: 48 }}
          >
            Jour
          </Typography>
          <Select
            value={dayOfMonth}
            onChange={(e) => handleDayOfMonthChange(e.target.value as number)}
            size="small"
            sx={{
              minWidth: 140,
              fontSize: '0.8125rem',
              '& .MuiSelect-select': { py: 0.75 },
            }}
          >
            {Array.from({ length: 28 }, (_, i) => i + 1).map((d) => (
              <MenuItem key={d} value={d}>
                {d}e&nbsp;
                {hasMonth ? MONTH_LABELS.find((m) => m.value === month)?.label : 'jour'}
              </MenuItem>
            ))}
          </Select>
        </Stack>
      )}
    </Stack>
  )

  const renderDescriptionCard = description ? (
    <Box
      sx={{
        borderRadius: br.lg,
        background: (t) =>
          t.palette.mode === 'light'
            ? `linear-gradient(135deg, ${alpha('#6366F1', 0.05)} 0%, ${alpha('#10B981', 0.04)} 100%)`
            : `linear-gradient(135deg, ${alpha('#6366F1', 0.08)} 0%, ${alpha('#10B981', 0.06)} 100%)`,
        border: (t) =>
          `1px solid ${
            t.palette.mode === 'light' ? alpha('#6366F1', 0.12) : alpha('#6366F1', 0.2)
          }`,
        p: 1.5,
      }}
    >
      <Stack direction="row" spacing={1.5} alignItems="center">
        <CheckCircleIcon
          sx={{
            fontSize: 18,
            color: valid ? 'success.main' : 'error.main',
          }}
        />
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              fontWeight: 500,
              fontSize: '0.65rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Planification
          </Typography>
          <Typography variant="body2" fontWeight={600} color="text.primary">
            {description}
          </Typography>
        </Box>
      </Stack>
    </Box>
  ) : null

  const renderNextDates =
    nextDates.length > 0 ? (
      <Box sx={{ pt: 0.5 }}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            fontWeight: 600,
            fontSize: '0.65rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            mb: 1,
            display: 'block',
          }}
        >
          Prochaines exécutions
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {nextDates.map((d, i) => (
            <Box
              key={i}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.75,
                px: 1.25,
                py: 0.5,
                borderRadius: br.pill,
                bgcolor: (t) => alpha(t.palette.primary.main, 0.06),
                border: (t) => `1px solid ${alpha(t.palette.primary.main, 0.1)}`,
                transition: transitions.smooth,
                '&:hover': {
                  bgcolor: (t) => alpha(t.palette.primary.main, 0.1),
                  transform: 'translateY(-1px)',
                },
              }}
            >
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  bgcolor: (t) =>
                    i === 0 ? t.palette.primary.main : alpha(t.palette.primary.main, 0.4),
                }}
              />
              <Typography
                variant="caption"
                fontWeight={500}
                color="text.primary"
                sx={{ fontSize: '0.7rem' }}
              >
                {d.toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'short',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>
    ) : null

  const renderExpertToggle = (
    <Stack
      direction="row"
      spacing={0.75}
      alignItems="center"
      onClick={() => setExpertMode(!expertMode)}
      sx={{
        cursor: 'pointer',
        alignSelf: 'flex-start',
        px: 1,
        py: 0.5,
        borderRadius: br.sm,
        transition: transitions.smooth,
        '&:hover': {
          bgcolor: (t) => alpha(t.palette.primary.main, 0.06),
        },
      }}
    >
      <TuneIcon
        sx={{
          fontSize: 14,
          color: 'text.secondary',
          transition: transitions.default,
          transform: expertMode ? 'rotate(90deg)' : 'rotate(0deg)',
        }}
      />
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{
          fontWeight: 500,
          fontSize: '0.7rem',
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
        }}
      >
        {expertMode ? 'Masquer le mode expert' : 'Mode expert (expression cron brute)'}
      </Typography>
    </Stack>
  )

  const renderExpertField = (
    <Collapse in={expertMode} timeout={250} easing="cubic-bezier(0.4, 0, 0.2, 1)">
      <Box
        sx={{
          mt: 1,
          p: 1.5,
          borderRadius: br.md,
          bgcolor: (t) => alpha(t.palette.common.black, t.palette.mode === 'light' ? 0.02 : 0.08),
          border: (t) =>
            `1px solid ${
              t.palette.mode === 'light'
                ? alpha(t.palette.common.black, 0.06)
                : alpha(t.palette.common.white, 0.06)
            }`,
        }}
      >
        <TextField
          id={id}
          value={cronValue}
          onChange={handleExpertChange}
          size="small"
          fullWidth
          placeholder="0 8 * * * ?"
          helperText={
            valid
              ? '✓ Expression valide'
              : cronValue
                ? '✗ Expression invalide — vérifiez la syntaxe'
                : 'Saisissez une expression cron (6 champs)'
          }
          error={!!(cronValue && !valid)}
          sx={{
            '& .MuiInputBase-input': {
              fontFamily: '"JetBrains Mono", "Fira Code", monospace',
              fontSize: '0.8125rem',
              letterSpacing: '0.02em',
            },
          }}
        />
      </Box>
    </Collapse>
  )

  return (
    <Box
      sx={{
        width: '100%',
        borderRadius: 0,
      }}
    >
      <Stack spacing={2}>
        <Typography
          variant="body2"
          fontWeight={600}
          color="text.primary"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            fontSize: '0.8125rem',
          }}
        >
          <FieldTitle label={props.label ?? 'Fréquence'} isRequired={isRequired} />
        </Typography>

        <ToggleButtonGroup
          value={preset}
          exclusive
          onChange={handlePresetChange}
          size="small"
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            width: '100%',
            gap: 0.5,
            '& .MuiToggleButtonGroup-grouped': {
              flex: { xs: '1 1 calc(50% - 4px)', sm: '1 1 calc(33.33% - 4px)', md: '1 1 auto' },
              border: (t) => `1px solid ${alpha(t.palette.divider, 0.5)}`,
              borderRadius: br.sm,
              mx: 0,
              '&:not(:first-of-type)': {
                ml: 0,
              },
            },
          }}
        >
          {PRESETS.map((key) => (
            <ToggleButton
              key={key}
              value={key}
              sx={{
                textTransform: 'none',
                fontSize: '0.7rem',
                fontWeight: 500,
                px: 0.5,
                py: 0.6,
                gap: 0.4,
                letterSpacing: '0.01em',
                transition: transitions.smooth,
                color: 'text.secondary',
                '&:hover': {
                  bgcolor: (t) => alpha(t.palette.primary.main, 0.06),
                  borderColor: (t) => alpha(t.palette.primary.main, 0.3),
                },
                '&.Mui-selected': {
                  bgcolor: (t) => alpha(t.palette.primary.main, 0.1),
                  color: (t) => (t.palette.mode === 'light' ? '#4F46E5' : '#A5B4FC'),
                  borderColor: (t) => alpha(t.palette.primary.main, 0.35),
                  fontWeight: 600,
                  '&:hover': {
                    bgcolor: (t) => alpha(t.palette.primary.main, 0.14),
                  },
                },
              }}
            >
              {presetIcons[key]}
              {presetLabels[key]}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {preset === 'custom' ? (
            renderTimeSelectors
          ) : (
            <>
              {renderTimeSelectors}
              {(hasDayOfWeek || hasDayOfMonth || hasMonth) && renderOptionSelectors}
            </>
          )}
        </Box>

        {renderDescriptionCard}

        {renderNextDates}

        {renderExpertToggle}

        {renderExpertField}

        {fieldState.error && (
          <FormHelperText error sx={{ fontSize: '0.75rem', mt: 0.5 }}>
            {fieldState.error?.message ?? ''}
          </FormHelperText>
        )}
      </Stack>
    </Box>
  )
}

function HourSelect({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value as number)}
      size="small"
      sx={{
        minWidth: 76,
        fontSize: '0.8125rem',
        fontWeight: 600,
        '& .MuiSelect-select': { py: 0.75 },
      }}
    >
      {Array.from({ length: 24 }, (_, i) => (
        <MenuItem key={i} value={i}>
          {String(i).padStart(2, '0')}
        </MenuItem>
      ))}
    </Select>
  )
}

function MinuteSelect({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value as number)}
      size="small"
      sx={{
        minWidth: 76,
        fontSize: '0.8125rem',
        fontWeight: 600,
        '& .MuiSelect-select': { py: 0.75 },
      }}
    >
      {[0, 15, 30, 45].map((m) => (
        <MenuItem key={m} value={m}>
          {String(m).padStart(2, '0')}
        </MenuItem>
      ))}
    </Select>
  )
}
