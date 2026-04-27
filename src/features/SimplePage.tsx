import { Box, Typography } from '@mui/material'

interface SimplePageProps {
  title: string
}

export default function SimplePage({ title }: SimplePageProps) {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">{title}</Typography>
    </Box>
  )
}
