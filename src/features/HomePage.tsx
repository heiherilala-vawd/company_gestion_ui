import { Box, Button, Typography, Grid, useTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import PaidIcon from '@mui/icons-material/Paid'
import MoneyOffIcon from '@mui/icons-material/MoneyOff'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import InventoryIcon from '@mui/icons-material/Inventory'

const buttons = [
  { label: 'Achats', icon: ShoppingCartIcon, to: '/purchases', color: '#1976d2', desc: 'Acheter' },
  {
    label: 'Déplacements',
    icon: LocalShippingIcon,
    to: '/travel_equipment',
    color: '#ed6c02',
    desc: 'Déplacer',
  },
  { label: 'Revenus', icon: PaidIcon, to: '/incomes', color: '#2e7d32', desc: 'Recevoir' },
  { label: 'Dépenses', icon: MoneyOffIcon, to: '/expenses', color: '#9c27b0', desc: 'Payer' },
  {
    label: 'Valider Payment',
    icon: CheckCircleIcon,
    to: '/employer_payments',
    color: '#00897b',
    desc: 'Valider',
  },
  {
    label: 'Valider Réception',
    icon: InventoryIcon,
    to: '/travel_materials',
    color: '#c62828',
    desc: 'Réception',
  },
]

function ActionButton({ btn }: { btn: (typeof buttons)[0] }) {
  const navigate = useNavigate()
  const Icon = btn.icon

  return (
    <Button
      variant="contained"
      fullWidth
      onClick={() => navigate(btn.to)}
      sx={{
        height: { xs: 110, sm: 130 },
        minWidth: 140,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 0.5,
        py: 1.5,
        fontSize: { xs: '0.8rem', sm: '0.9rem' },
        fontWeight: 600,
        backgroundColor: btn.color,
        borderRadius: 2,
        textTransform: 'none',
        '&:hover': {
          backgroundColor: btn.color,
          opacity: 0.9,
          transform: 'translateY(-2px)',
        },
      }}
    >
      <Icon sx={{ fontSize: { xs: 28, sm: 32 } }} />
      {btn.label}
      <Typography
        variant="caption"
        sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' }, opacity: 0.85 }}
      >
        {btn.desc}
      </Typography>
    </Button>
  )
}

export default function HomePage() {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 4 },
        width: '100%',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          textAlign: 'center',
          color: isDark ? '#fff' : 'text.primary',
        }}
      >
        Bienvenue sur Test Admin
      </Typography>

      <Box sx={{ width: '100%', maxWidth: 800 }}>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            textAlign: 'center',
            color: isDark ? '#e0e0e0' : 'text.secondary',
          }}
        >
          Gestion
        </Typography>
        <Grid container spacing={2} sx={{ mb: 4, justifyContent: 'center' }}>
          {buttons.slice(0, 4).map((btn) => (
            <Grid item xs={6} sm={3} key={btn.label} sx={{ display: 'flex' }}>
              <ActionButton btn={btn} />
            </Grid>
          ))}
        </Grid>

        <Typography
          variant="h6"
          sx={{
            mb: 2,
            textAlign: 'center',
            color: isDark ? '#e0e0e0' : 'text.secondary',
          }}
        >
          Validation
        </Typography>
        <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
          {buttons.slice(4, 6).map((btn) => (
            <Grid item xs={6} sm={3} key={btn.label} sx={{ display: 'flex' }}>
              <ActionButton btn={btn} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}
