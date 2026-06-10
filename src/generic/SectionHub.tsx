import { Box, Typography, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { alpha } from '@mui/material/styles'
import { accentGradients } from '../style/themeConfig'
import { sectionHubStyles, pausedFeature, pausedBadge } from '../style/components'

interface HubItem {
  label: string
  icon: React.ElementType
  to: string
  color: keyof typeof accentGradients
  desc?: string
  disabled?: boolean
}

export function SectionHub({ title, items }: { title: string; items: HubItem[] }) {
  const navigate = useNavigate()

  return (
    <Box sx={sectionHubStyles.container} data-testid="section-hub">
      <Typography variant="h5" sx={sectionHubStyles.title}>
        {title}
      </Typography>
      <Grid container spacing={2.5} sx={sectionHubStyles.grid}>
        {items.map((item) => {
          const Icon = item.icon
          const grad = accentGradients[item.color]
          const isAction = !!item.desc
          return (
            <Grid item xs={4} sm={3} key={item.label} sx={sectionHubStyles.gridItem}>
              <Box
                onClick={() => !item.disabled && navigate(item.to)}
                sx={{
                  ...(isAction ? sectionHubStyles.actionBox : sectionHubStyles.linkBox),
                  ...(item.disabled ? pausedFeature : {}),
                  cursor: item.disabled ? 'default' : 'pointer',
                }}
              >
                <Box
                  sx={{
                    ...sectionHubStyles.circle,
                    width: isAction ? { xs: 52, sm: 64 } : { xs: 48, sm: 52 },
                    height: isAction ? { xs: 52, sm: 64 } : { xs: 48, sm: 52 },
                    background: grad,
                    boxShadow: `0 4px 12px ${alpha('#000', 0.12)}`,
                    mb: 1,
                    ...(isAction &&
                      !item.disabled && {
                        '&:hover': { transform: 'scale(1.08)' },
                      }),
                  }}
                >
                  <Icon
                    sx={{
                      ...sectionHubStyles.circleIcon,
                      fontSize: isAction ? { xs: 20, sm: 26 } : { xs: 20, sm: 24 },
                    }}
                  />
                </Box>
                <Typography sx={sectionHubStyles.label}>{item.label}</Typography>
                {item.desc && !item.disabled && (
                  <Typography sx={sectionHubStyles.desc}>{item.desc}</Typography>
                )}
                {item.disabled && (
                  <Typography>
                    <Box component="span" sx={pausedBadge}>
                      Bientôt
                    </Box>
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
