import React from 'react'
import { Box, Skeleton } from '@mui/material'
import { skeletonStyles } from '../style/components'
import { borderRadius as br } from '../style/themeConfig'

interface SkeletonLoaderProps {
  rows?: number
  showAvatar?: boolean
}

export const SkeletonLoader = ({ rows = 5, showAvatar = false }: SkeletonLoaderProps) => {
  return (
    <Box sx={skeletonStyles.container}>
      <Box sx={skeletonStyles.headerBox}>
        <Skeleton variant="text" width={200} height={32} sx={skeletonStyles.skeletonItem} />
        <Skeleton
          variant="rectangular"
          width={120}
          height={36}
          sx={{ ...skeletonStyles.skeletonItem, borderRadius: br.sm }}
        />
      </Box>

      <Box sx={skeletonStyles.filterBox}>
        <Skeleton
          variant="rectangular"
          width={300}
          height={40}
          sx={{ ...skeletonStyles.skeletonItem, borderRadius: br.sm }}
        />
        <Skeleton
          variant="rectangular"
          width={150}
          height={40}
          sx={{ ...skeletonStyles.skeletonItem, borderRadius: br.sm }}
        />
      </Box>

      {Array.from({ length: rows }).map((_, index) => (
        <Box key={index} sx={skeletonStyles.row}>
          {showAvatar && (
            <Skeleton variant="circular" width={40} height={40} sx={skeletonStyles.skeletonItem} />
          )}
          <Box sx={skeletonStyles.contentBox}>
            <Skeleton variant="text" width="60%" height={24} sx={skeletonStyles.skeletonItem} />
            <Skeleton variant="text" width="40%" height={20} sx={skeletonStyles.skeletonItem} />
          </Box>
          <Skeleton
            variant="rectangular"
            width={100}
            height={32}
            sx={{ ...skeletonStyles.skeletonItem, borderRadius: br.xs }}
          />
        </Box>
      ))}
    </Box>
  )
}

export default SkeletonLoader
