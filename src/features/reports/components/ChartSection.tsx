import { Card, CardContent, Typography, Box } from '@mui/material'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts'

const COLORS = [
  '#4CAF50',
  '#2196F3',
  '#FF9800',
  '#F44336',
  '#9C27B0',
  '#00BCD4',
  '#FF5722',
  '#607D8B',
  '#E91E63',
  '#3F51B5',
  '#009688',
  '#FFEB3B',
  '#795548',
  '#CDDC39',
  '#673AB7',
]

interface PieDataItem {
  name: string
  value: number
}

interface PieChartCardProps {
  title: string
  data: PieDataItem[]
}

export function PieChartCard({ title, data }: PieChartCardProps) {
  if (!data || data.length === 0) return null
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
          {title}
        </Typography>
        <Box sx={{ width: '100%', height: 280 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                innerRadius={40}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((_, idx) => (
                  <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  )
}

interface TimeSeriesItem {
  label: string
  value: number
  cumulative?: number
}

interface LineChartCardProps {
  title: string
  data: TimeSeriesItem[]
  total?: number
}

export function LineChartCard({ title, data, total }: LineChartCardProps) {
  if (!data || data.length === 0) return null
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
          {title} {total !== undefined && `— ${total.toLocaleString()} €`}
        </Typography>
        <Box sx={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#2196F3"
                strokeWidth={2}
                dot={{ r: 3 }}
                name="Valeur"
              />
              {data[0]?.cumulative !== undefined && (
                <Line
                  type="monotone"
                  dataKey="cumulative"
                  stroke="#4CAF50"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  name="Cumul"
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  )
}
