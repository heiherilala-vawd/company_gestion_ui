import { Box, Typography, Grid, Paper } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { homePageStyles } from '../style/components'
import { borderRadius as br, transitions } from '../style/themeConfig'
import {
  quickActionButtons,
  getVisibleQuickActions,
  getVisibleValidationButtons,
  buttonThemes,
} from '../config/homeButtons'

function ActionCard({ btn }: { btn: (typeof quickActionButtons)[0] }) {
  const navigate = useNavigate()
  const Icon = btn.icon
  const theme = buttonThemes[btn.color]

  return (
    <Paper
      elevation={0}
      onClick={() => navigate(btn.to)}
      sx={{
        borderRadius: br.xl,
        background: theme.gradient,
        color: '#F3F6ED',
        p: 2.5,
        cursor: 'pointer',
        height: { xs: 130, sm: 150 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1.25,
        transition: transitions.spring,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: theme.glow,
        '&::after': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 50%, rgba(0,0,0,0.08) 100%)',
          pointerEvents: 'none',
        },
        '&:hover': {
          transform: 'translateY(-4px) scale(1.02)',
          boxShadow: theme.hoverGlow,
        },
        '&:active': {
          transform: 'translateY(-2px) scale(0.98)',
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Icon sx={{ fontSize: { xs: 32, sm: 36 }, opacity: 0.9 }} />
        <Box>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: { xs: '0.85rem', sm: '0.95rem' },
              textAlign: 'center',
              lineHeight: 1.3,
            }}
          >
            {btn.label}
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '0.65rem', sm: '0.7rem' },
              opacity: 0.75,
              textAlign: 'center',
              mt: 0.25,
              fontWeight: 500,
            }}
          >
            {btn.desc}
          </Typography>
        </Box>
      </Box>
    </Paper>
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
          <Grid container spacing={2.5} sx={homePageStyles.gridContainer}>
            {visibleQuick.map((btn) => (
              <Grid item xs={6} sm={4} md={2} key={btn.label} sx={homePageStyles.gridItem}>
                <ActionCard btn={btn} />
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
          <Grid container spacing={2.5} sx={homePageStyles.gridContainer}>
            {visibleValidation.map((btn) => (
              <Grid item xs={6} sm={4} md={2} key={btn.label} sx={homePageStyles.gridItem}>
                <ActionCard btn={btn} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  )
}
