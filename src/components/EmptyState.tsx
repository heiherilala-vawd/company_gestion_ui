import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import { emptyStateStyles } from '../style/components'
import { borderRadius as br } from '../style/themeConfig'

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
}

export const EmptyState = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) => {
  return (
    <Box sx={emptyStateStyles}>
      {icon && (
        <Box
          sx={{
            fontSize: '4rem',
            color: 'text.disabled',
            mb: 2,
            opacity: 0.6,
          }}
        >
          {icon}
        </Box>
      )}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          mb: 1,
          color: 'text.primary',
        }}
      >
        {title}
      </Typography>
      {description && (
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            mb: 3,
            maxWidth: 400,
          }}
        >
          {description}
        </Typography>
      )}
      {actionLabel && onAction && (
        <Button
          variant="contained"
          onClick={onAction}
          sx={{
            borderRadius: br.sm,
            textTransform: 'none',
            fontWeight: 500,
          }}
        >
          {actionLabel}
        </Button>
      )}
    </Box>
  )
}

export default EmptyState
