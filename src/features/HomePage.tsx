import { Box, Button, Typography, Grid } from '@mui/material'
import { useTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { homePageStyles } from '../style/components'
import {
  quickActionButtons,
  validationButtons,
  getButtonSx,
  iconSx,
  buttonLabelSx,
} from '../config/homeButtons'

function ActionButton({
  btn,
  mode,
}: {
  btn: (typeof quickActionButtons)[0]
  mode: 'light' | 'dark'
}) {
  const navigate = useNavigate()
  const Icon = btn.icon
  const sx = getButtonSx(btn.color, mode)

  return (
    <Button variant="contained" fullWidth onClick={() => navigate(btn.to)} sx={sx}>
      <Icon sx={iconSx} />
      <Typography variant="body2" sx={buttonLabelSx}>
        {btn.label}
      </Typography>
    </Button>
  )
}

export default function HomePage() {
  const theme = useTheme()
  const mode = theme.palette.mode as 'light' | 'dark'

  return (
    <Box sx={homePageStyles.container}>
      <Box sx={homePageStyles.welcomeBox}>
        <Typography variant="h4" sx={homePageStyles.title}>
          Bienvenue sur Test Admin
        </Typography>
        <Typography variant="body1" sx={homePageStyles.subtitle}>
          Gérez votre entreprise efficacement
        </Typography>
      </Box>

      <Box sx={homePageStyles.sectionContainer}>
        <Typography variant="h6" sx={homePageStyles.sectionHeader}>
          Actions rapides
        </Typography>
        <Grid container spacing={3} sx={homePageStyles.gridContainer}>
          {quickActionButtons.map((btn) => (
            <Grid item xs={6} sm={4} md={2} key={btn.label} sx={homePageStyles.gridItem}>
              <ActionButton btn={btn} mode={mode} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ ...homePageStyles.sectionContainer, mt: 4 }}>
        <Typography variant="h6" sx={homePageStyles.sectionHeader}>
          Validations
        </Typography>
        <Grid container spacing={3} sx={homePageStyles.gridContainer}>
          {validationButtons.map((btn) => (
            <Grid item xs={6} sm={4} md={2} key={btn.label} sx={homePageStyles.gridItem}>
              <ActionButton btn={btn} mode={mode} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}
