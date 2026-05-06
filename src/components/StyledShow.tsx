import React from 'react'
import {
  Show,
  TabbedShowLayout,
  Tab,
  useShowController,
  ReferenceManyField,
  Datagrid,
  DateField,
  FunctionField,
  TextField,
} from 'react-admin'
import { Box, Card, CardContent, Typography, Chip, Stack, Divider, alpha } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import {
  colors,
  borderRadius as br,
  transitions,
  getShadow,
  getBackgroundColor,
} from '../style/themeConfig'

interface StyledShowProps {
  title?: string
  children?: React.ReactNode
}

export const StyledShow = ({ title, children }: StyledShowProps) => {
  const theme = useTheme()
  const mode = theme.palette.mode as 'light' | 'dark'

  return (
    <Show
      sx={{
        '& .RaShow-main': {
          backgroundColor: 'transparent',
          boxShadow: 'none',
        },
      }}
    >
      <Card
        sx={{
          borderRadius: br.lg,
          boxShadow: getShadow(mode, 'sm'),
          border:
            mode === 'light'
              ? `1px solid ${colors.light.divider}`
              : `1px solid ${colors.dark.divider}`,
          overflow: 'hidden',
        }}
      >
        {title && (
          <Box
            sx={{
              p: 3,
              borderBottom:
                mode === 'light'
                  ? `1px solid ${colors.light.divider}`
                  : `1px solid ${colors.dark.divider}`,
              backgroundColor: getBackgroundColor(mode, 'paper'),
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {title}
            </Typography>
          </Box>
        )}
        <CardContent sx={{ p: { xs: 2, md: 3 } }}>{children}</CardContent>
      </Card>
    </Show>
  )
}

export const StyledTabbedShowLayout = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme()
  const mode = theme.palette.mode as 'light' | 'dark'

  return (
    <TabbedShowLayout
      sx={{
        '& .RaTabbedShowLayout-root': {
          borderRadius: br.lg,
          overflow: 'hidden',
        },
        '& .RaTabbedShowLayout-tabs': {
          backgroundColor: getBackgroundColor(mode, 'paper'),
          borderBottom:
            mode === 'light'
              ? `1px solid ${colors.light.divider}`
              : `1px solid ${colors.dark.divider}`,
        },
      }}
    >
      {children}
    </TabbedShowLayout>
  )
}

export const StyledTab = ({ label, ...props }: { label: string; [key: string]: any }) => {
  return (
    <Tab
      label={label}
      sx={{
        fontWeight: 500,
        textTransform: 'none',
        fontSize: '0.875rem',
      }}
      {...props}
    />
  )
}

export const StyledReferenceManyField = ({ children, ...props }: any) => {
  const theme = useTheme()
  const mode = theme.palette.mode as 'light' | 'dark'

  return (
    <ReferenceManyField
      {...props}
      sx={{
        '& .RaReferenceManyField-root': {
          borderRadius: br.md,
          overflow: 'hidden',
        },
      }}
    >
      <Datagrid
        sx={{
          borderRadius: br.md,
          '& .RaDatagrid-row:hover': {
            backgroundColor: alpha(colors.primary.main, mode === 'light' ? 0.04 : 0.08),
          },
        }}
      >
        {children}
      </Datagrid>
    </ReferenceManyField>
  )
}

export const InfoCard = ({ title, children }: { title?: string; children: React.ReactNode }) => {
  const theme = useTheme()
  const mode = theme.palette.mode as 'light' | 'dark'

  return (
    <Card
      sx={{
        borderRadius: br.md,
        mb: 2,
        boxShadow: 'none',
        border:
          mode === 'light'
            ? `1px solid ${colors.light.divider}`
            : `1px solid ${colors.dark.divider}`,
      }}
    >
      {title && (
        <Box
          sx={{
            p: 2,
            borderBottom:
              mode === 'light'
                ? `1px solid ${colors.light.divider}`
                : `1px solid ${colors.dark.divider}`,
            backgroundColor: getBackgroundColor(mode, 'paper'),
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
            {title}
          </Typography>
        </Box>
      )}
      <CardContent sx={{ p: 2 }}>{children}</CardContent>
    </Card>
  )
}

export const FieldRow = ({
  label,
  value,
  mode,
}: {
  label: string
  value: React.ReactNode
  mode?: 'light' | 'dark'
}) => {
  const currentMode = mode || ('light' as const)
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        py: 1.5,
        borderBottom:
          currentMode === 'light'
            ? `1px solid ${colors.light.divider}`
            : `1px solid ${colors.dark.divider}`,
        '&:last-child': {
          borderBottom: 'none',
        },
      }}
    >
      <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
        {label}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 500 }}>
        {value}
      </Typography>
    </Box>
  )
}
