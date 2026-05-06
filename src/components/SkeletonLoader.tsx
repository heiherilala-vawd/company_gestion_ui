import React from 'react'
import { Box, Skeleton, useTheme } from '@mui/material'

interface SkeletonLoaderProps {
  rows?: number
  showAvatar?: boolean
}

export const SkeletonLoader = ({ rows = 5, showAvatar = false }: SkeletonLoaderProps) => {
  const theme = useTheme()

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      {/* Header skeleton */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Skeleton
          variant="text"
          width={200}
          height={32}
          sx={{
            bgcolor: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)',
          }}
        />
        <Skeleton
          variant="rectangular"
          width={120}
          height={36}
          sx={{
            borderRadius: 2,
            bgcolor: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)',
          }}
        />
      </Box>

      {/* Filter skeleton */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Skeleton
          variant="rectangular"
          width={300}
          height={40}
          sx={{
            borderRadius: 2,
            bgcolor: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)',
          }}
        />
        <Skeleton
          variant="rectangular"
          width={150}
          height={40}
          sx={{
            borderRadius: 2,
            bgcolor: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)',
          }}
        />
      </Box>

      {/* Table rows skeleton */}
      {Array.from({ length: rows }).map((_, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            py: 2,
            borderBottom: (theme) =>
              `1px solid ${theme.palette.mode === 'light' ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.04)'}`,
          }}
        >
          {showAvatar && (
            <Skeleton
              variant="circular"
              width={40}
              height={40}
              sx={{
                bgcolor:
                  theme.palette.mode === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)',
              }}
            />
          )}
          <Box sx={{ flex: 1 }}>
            <Skeleton
              variant="text"
              width="60%"
              height={24}
              sx={{
                bgcolor:
                  theme.palette.mode === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)',
              }}
            />
            <Skeleton
              variant="text"
              width="40%"
              height={20}
              sx={{
                bgcolor:
                  theme.palette.mode === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)',
              }}
            />
          </Box>
          <Skeleton
            variant="rectangular"
            width={100}
            height={32}
            sx={{
              borderRadius: 1,
              bgcolor:
                theme.palette.mode === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)',
            }}
          />
        </Box>
      ))}
    </Box>
  )
}

export default SkeletonLoader
