import { Box, Button, Typography, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import PaidIcon from '@mui/icons-material/Paid'
import MoneyOffIcon from '@mui/icons-material/MoneyOff'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import InventoryIcon from '@mui/icons-material/Inventory'
import { homePageStyles } from '../style/components'

type ButtonColor = 'red' | 'success' | 'warning'

const buttons: {
  label: string
  icon: React.ElementType
  to: string
  desc: string
  color: ButtonColor
}[] = [
  {
    label: 'Achats',
    icon: ShoppingCartIcon,
    to: '/purchases_activity',
    desc: 'Acheter',
    color: 'red',
  },
  {
    label: 'Déplacements',
    icon: LocalShippingIcon,
    to: '/travel_equipment_activity',
    desc: 'Déplacer',
    color: 'success',
  },
  { label: 'Revenus', icon: PaidIcon, to: '/incomes_activity', desc: 'Recevoir', color: 'red' },
  {
    label: 'Dépenses',
    icon: MoneyOffIcon,
    to: '/expenses_activity',
    desc: 'Payer',
    color: 'red',
  },
]

const validationButtons: {
  label: string
  icon: React.ElementType
  to: string
  desc: string
  color: ButtonColor
}[] = [
  {
    label: 'Valider Payment',
    icon: CheckCircleIcon,
    to: '/employer_payments_activity',
    desc: 'Valider',
    color: 'warning',
  },
  {
    label: 'Valider Réception',
    icon: InventoryIcon,
    to: '/travel_materials_activity',
    desc: 'Réception',
    color: 'warning',
  },
]

const styleMap: Record<ButtonColor, Record<string, any>> = {
  red: homePageStyles.actionButtonRed,
  success: homePageStyles.actionButtonSuccess,
  warning: homePageStyles.actionButtonWarning,
}

function ActionButton({ btn }: { btn: (typeof buttons)[0] }) {
  const navigate = useNavigate()
  const Icon = btn.icon
  const sx = styleMap[btn.color]

  return (
    <Button variant="contained" fullWidth onClick={() => navigate(btn.to)} sx={sx}>
      <Icon sx={homePageStyles.icon} />
      <Typography variant="body2" sx={homePageStyles.buttonLabel}>
        {btn.label}
      </Typography>
      <Typography variant="caption" sx={homePageStyles.buttonDesc}>
        {btn.desc}
      </Typography>
    </Button>
  )
}

export default function HomePage() {
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
          {buttons.map((btn) => (
            <Grid item xs={6} sm={4} md={2} key={btn.label} sx={homePageStyles.gridItem}>
              <ActionButton btn={btn} />
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
              <ActionButton btn={btn} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}
