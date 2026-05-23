import { Box, Typography, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { alpha } from '@mui/material/styles'
import { natureGradients } from '../style/themeConfig'

interface HubItem {
  label: string
  icon: React.ElementType
  to: string
  color: keyof typeof natureGradients
}

export function SectionHub({ title, items }: { title: string; items: HubItem[] }) {
  const navigate = useNavigate()

  return (
    <Box sx={{ p: { xs: 2.5, sm: 4 }, width: '100%', maxWidth: 600, mx: 'auto' }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
          mb: 3,
          textAlign: 'center',
          color: 'text.primary',
          fontSize: { xs: '1.1rem', sm: '1.25rem' },
        }}
      >
        {title}
      </Typography>
      <Grid container spacing={2.5} sx={{ justifyContent: 'center' }}>
        {items.map((item) => {
          const Icon = item.icon
          const grad = natureGradients[item.color]
          return (
            <Grid
              item
              xs={4}
              sm={3}
              key={item.label}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <Box
                onClick={() => navigate(item.to)}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                  width: { xs: 88, sm: 100 },
                  py: 1.5,
                  borderRadius: 2,
                  transition: 'all 0.2s',
                  '&:hover': {
                    bgcolor: 'action.hover',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: { xs: 48, sm: 52 },
                    height: { xs: 48, sm: 52 },
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: grad,
                    boxShadow: `0 4px 12px ${alpha('#000', 0.12)}`,
                    mb: 1,
                    position: 'relative',
                    overflow: 'hidden',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 50%, rgba(0,0,0,0.08) 100%)',
                      borderRadius: '50%',
                      pointerEvents: 'none',
                    },
                  }}
                >
                  <Icon
                    sx={{
                      fontSize: { xs: 20, sm: 24 },
                      color: '#F3F6ED',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  />
                </Box>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: { xs: '0.65rem', sm: '0.7rem' },
                    textAlign: 'center',
                    color: 'text.primary',
                    lineHeight: 1.3,
                  }}
                >
                  {item.label}
                </Typography>
              </Box>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}
