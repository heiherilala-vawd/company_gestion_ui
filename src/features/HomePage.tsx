import { Box, Typography, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { homePageStyles } from '../style/components'
import {
  quickActionButtons,
  getVisibleQuickActions,
  getVisibleValidationButtons,
  buttonThemes,
} from '../config/homeButtons'

function IllustrationCard({ btn }: { btn: (typeof quickActionButtons)[0] }) {
  const navigate = useNavigate()
  const Icon = btn.icon
  const theme = buttonThemes[btn.color]

  return (
    <Box onClick={() => navigate(btn.to)} sx={homePageStyles.illustrationCard}>
      <Box
        sx={{
          ...homePageStyles.illustrationCircle,
          background: theme.gradient,
          boxShadow: theme.glow,
        }}
      >
        <Icon sx={homePageStyles.illustrationIcon} />
      </Box>
      <Typography sx={homePageStyles.illustrationLabel}>{btn.label}</Typography>
      <Typography sx={homePageStyles.illustrationDesc}>{btn.desc}</Typography>
    </Box>
  )
}

export default function HomePage() {
  const visibleQuick = getVisibleQuickActions()
  const visibleValidation = getVisibleValidationButtons()

  return (
    <Box sx={homePageStyles.container}>
      <Box sx={homePageStyles.welcomeBox}>
        <Typography variant="h4" sx={homePageStyles.title}>
          GestPro
        </Typography>
        <Typography variant="body1" sx={homePageStyles.subtitle}>
          Gérez votre entreprise efficacement
        </Typography>
      </Box>

      {visibleQuick.length > 0 && (
        <Box sx={homePageStyles.sectionContainer}>
          <Typography variant="h6" sx={homePageStyles.sectionHeader}>
            Actions rapides
          </Typography>
          <Grid container spacing={3} sx={homePageStyles.gridContainer}>
            {visibleQuick.map((btn) => (
              <Grid item xs={4} sm={3} md={2} key={btn.label} sx={homePageStyles.gridItem}>
                <IllustrationCard btn={btn} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {visibleValidation.length > 0 && (
        <Box sx={{ ...homePageStyles.sectionContainer, mt: 4 }}>
          <Typography variant="h6" sx={homePageStyles.sectionHeader}>
            Validations
          </Typography>
          <Grid container spacing={3} sx={homePageStyles.gridContainer}>
            {visibleValidation.map((btn) => (
              <Grid item xs={4} sm={3} md={2} key={btn.label} sx={homePageStyles.gridItem}>
                <IllustrationCard btn={btn} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  )
}
