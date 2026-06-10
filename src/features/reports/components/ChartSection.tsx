import { Card, CardContent, Typography, Box, useTheme } from '@mui/material'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts'
import { dashboardStyles } from '../../../style/components'

const COLORS = [
  '#6366F1',
  '#10B981',
  '#F59E0B',
  '#F43F5E',
  '#8B5CF6',
  '#06B6D4',
  '#3B82F6',
  '#EC4899',
  '#14B8A6',
  '#F97316',
  '#0EA5E9',
  '#84CC16',
  '#E11D48',
  '#7C3AED',
  '#0D9488',
]

const MIN_BARS = 5

interface PieDataItem {
  name: string
  value: number
}

interface PieChartCardProps {
  title: string
  data: PieDataItem[]
}

export function PieChartCard({ title, data }: PieChartCardProps) {
  const theme = useTheme()
  if (!data || data.length === 0) return null
  const total = data.reduce((s, d) => s + (d.value ?? 0), 0)

  return (
    <Card sx={dashboardStyles.chartCard}>
      <CardContent
        sx={{ p: { xs: 2, sm: 3 }, height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <Typography
          sx={{
            color: 'text.secondary',
            fontWeight: 600,
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            mb: 1.5,
          }}
        >
          {title}
        </Typography>
        <Box sx={{ flex: 1, minHeight: { xs: 260, sm: 300 }, width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data.map((d) => ({ ...d, name: d.name ?? 'N/A', value: d.value ?? 0 }))}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRatio={80}
                innerRatio={40}
                outerRadius="80%"
                innerRadius="40%"
                isAnimationActive={true}
                animationBegin={0}
                animationDuration={800}
                stroke="none"
                paddingAngle={2}
              >
                {data.map((_, idx) => (
                  <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [`${(value ?? 0).toLocaleString()}`, '']}
                contentStyle={{
                  borderRadius: 8,
                  border: `1px solid ${theme.palette.divider}`,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1E293B',
                  fontSize: 13,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            mt: 1.5,
            justifyContent: 'center',
          }}
        >
          {data.map((item, idx) => (
            <Box
              key={idx}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.5,
                fontSize: '0.7rem',
                fontWeight: 500,
                color: 'text.secondary',
              }}
            >
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '2px',
                  backgroundColor: COLORS[idx % COLORS.length],
                  flexShrink: 0,
                }}
              />
              <span>{item.name ?? 'N/A'}</span>
              <span style={{ fontWeight: 600 }}>
                {total > 0 ? `${((item.value / total) * 100).toFixed(1)}%` : '0%'}
              </span>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  )
}

function padToMinBars(
  data: { label: string; value: number }[],
): { label: string; value: number }[] {
  if (data.length >= MIN_BARS) return data
  const padded = [...data]
  for (let i = data.length; i < MIN_BARS; i++) {
    padded.push({ label: '', value: 0 })
  }
  return padded
}

interface BarChartCardProps {
  title: string
  data: { label: string; value: number }[]
  total?: number
  unit?: string
}

export function BarChartCard({ title, data, total, unit = '' }: BarChartCardProps) {
  const theme = useTheme()
  if (!data || data.length === 0) return null

  const chartData = padToMinBars(
    data.map((d) => ({ ...d, label: d.label ?? 'N/A', value: d.value ?? 0 })),
  )
  const isDark = theme.palette.mode === 'dark'

  return (
    <Card sx={dashboardStyles.chartCard}>
      <CardContent sx={{ p: { xs: 2, sm: 3 }, display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            mb: 1.5,
          }}
        >
          <Typography
            sx={{
              color: 'text.secondary',
              fontWeight: 600,
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {title}
          </Typography>
          {total !== undefined && (
            <Typography sx={{ fontWeight: 700, fontSize: '1.125rem', letterSpacing: '-0.02em' }}>
              {(total ?? 0).toLocaleString()} {unit}
            </Typography>
          )}
        </Box>
        <Box sx={{ height: { xs: 280, sm: 320 }, width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 8, right: 8, bottom: 0, left: -10 }}>
              <defs>
                <linearGradient
                  id={`barGrad-${title.replace(/\s/g, '')}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#6366F1" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#6366F1" stopOpacity={0.5} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}
                vertical={false}
              />
              <XAxis
                dataKey="label"
                tick={{
                  fontSize: 11,
                  fill: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
                }}
                axisLine={false}
                tickLine={false}
                interval={0}
                minTickGap={0}
                height={40}
              />
              <YAxis
                tick={{
                  fontSize: 11,
                  fill: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
                }}
                axisLine={false}
                tickLine={false}
                width={50}
              />
              <Tooltip
                formatter={(value: number) => [`${(value ?? 0).toLocaleString()} ${unit}`, '']}
                contentStyle={{
                  borderRadius: 8,
                  border: `1px solid ${theme.palette.divider}`,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1E293B',
                  fontSize: 13,
                }}
              />
              <Bar
                dataKey="value"
                fill={`url(#barGrad-${title.replace(/\s/g, '')})`}
                radius={[4, 4, 0, 0]}
                maxBarSize={48}
                isAnimationActive={true}
                animationDuration={600}
              >
                {chartData.map((entry, idx) => (
                  <Cell
                    key={idx}
                    fill={
                      entry.value === 0 && entry.label === ''
                        ? 'transparent'
                        : `url(#barGrad-${title.replace(/\s/g, '')})`
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  )
}
