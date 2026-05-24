import { Box, Typography, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { alpha } from '@mui/material/styles'
import { natureGradients, transitions } from '../style/themeConfig'

interface HubItem {
  label: string
  icon: React.ElementType
  to: string
  color: keyof typeof natureGradients
  desc?: string
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
          const isAction = !!item.desc
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
                sx={
                  isAction
                    ? {
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: transitions.spring,
                        width: { xs: 90, sm: 110 },
                        height: { xs: 110, sm: 130 },
                        '&:hover': { transform: 'translateY(-4px)' },
                        '&:active': { transform: 'translateY(-2px)' },
                      }
                    : {
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
                      }
                }
              >
                <Box
                  sx={{
                    width: isAction ? { xs: 52, sm: 64 } : { xs: 48, sm: 52 },
                    height: isAction ? { xs: 52, sm: 64 } : { xs: 48, sm: 52 },
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: grad,
                    boxShadow: `0 4px 12px ${alpha('#000', 0.12)}`,
                    mb: 1,
                    position: 'relative',
                    overflow: 'hidden',
                    transition: isAction ? transitions.default : undefined,
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 50%, rgba(0,0,0,0.08) 100%)',
                      borderRadius: '50%',
                      pointerEvents: 'none',
                    },
                    ...(isAction && {
                      '&:hover': { transform: 'scale(1.08)' },
                    }),
                  }}
                >
                  <Icon
                    sx={{
                      fontSize: isAction ? { xs: 20, sm: 26 } : { xs: 20, sm: 24 },
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
                {item.desc && (
                  <Typography
                    sx={{
                      fontSize: { xs: '0.5rem', sm: '0.55rem' },
                      color: 'text.secondary',
                      textAlign: 'center',
                      mt: 0.15,
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {item.desc}
                  </Typography>
                )}
              </Box>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}
