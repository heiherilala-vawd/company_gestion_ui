import { Box, Button, Typography, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import PaidIcon from '@mui/icons-material/Paid'
import MoneyOffIcon from '@mui/icons-material/MoneyOff'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import InventoryIcon from '@mui/icons-material/Inventory'

const buttons = [
  {
    label: 'Achats',
    icon: ShoppingCartIcon,
    to: '/purchases_activity',
    desc: 'Acheter',
  },
  {
    label: 'Déplacements',
    icon: LocalShippingIcon,
    to: '/travel_equipment_activity',
    desc: 'Déplacer',
  },
  { label: 'Revenus', icon: PaidIcon, to: '/incomes_activity', desc: 'Recevoir' },
  {
    label: 'Dépenses',
    icon: MoneyOffIcon,
    to: '/expenses_activity',
    desc: 'Payer',
  },
  {
    label: 'Valider Payment',
    icon: CheckCircleIcon,
    to: '/employer_payments_activity',
    desc: 'Valider',
  },
  {
    label: 'Valider Réception',
    icon: InventoryIcon,
    to: '/travel_materials_activity',
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
        height: { xs: 120, sm: 140 },
        minWidth: 140,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
        py: 2,
        fontSize: { xs: '0.8rem', sm: '0.9rem' },
        fontWeight: 600,
        background: 'linear-gradient(135deg, #ff5a3c 0%, #ff7a5c 100%)',
        borderRadius: 3,
        textTransform: 'none',
        boxShadow: (theme) =>
          theme.palette.mode === 'dark'
            ? '0 4px 12px rgba(255, 90, 60, 0.3)'
            : '0 4px 12px rgba(255, 90, 60, 0.25)',
        transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          background: 'linear-gradient(135deg, #ff5a3c 0%, #ff7a5c 100%)',
          transform: 'translateY(-4px)',
          boxShadow: (theme) =>
            theme.palette.mode === 'dark'
              ? '0 8px 24px rgba(255, 90, 60, 0.4)'
              : '0 8px 24px rgba(255, 90, 60, 0.35)',
          filter: 'brightness(1.1)',
        },
      }}
    >
      <Icon sx={{ fontSize: { xs: 32, sm: 36 } }} />
      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        {btn.label}
      </Typography>
      <Typography
        variant="caption"
        sx={{
          fontSize: { xs: '0.65rem', sm: '0.7rem' },
          opacity: 0.9,
        }}
      >
        {btn.desc}
      </Typography>
    </Button>
  )
}

export default function HomePage() {
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
      <Box
        sx={{
          textAlign: 'center',
          mb: 6,
          p: { xs: 3, sm: 4 },
          borderRadius: 4,
          backgroundColor: (theme) =>
            theme.palette.mode === 'light' ? 'rgba(255, 90, 60, 0.02)' : 'rgba(255, 90, 60, 0.04)',
          border: (theme) =>
            `1px solid ${theme.palette.mode === 'light' ? 'rgba(255, 90, 60, 0.1)' : 'rgba(255, 90, 60, 0.15)'}`,
          maxWidth: 600,
          width: '100%',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 1,
            fontWeight: 700,
            background: 'linear-gradient(135deg, #ff5a3c 0%, #ff7a5c 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.025em',
          }}
        >
          Bienvenue sur Test Admin
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            fontWeight: 400,
          }}
        >
          Gérez votre entreprise efficacement
        </Typography>
      </Box>

      <Box sx={{ width: '100%', maxWidth: 900 }}>
        <Typography
          variant="h6"
          sx={{
            mb: 3,
            textAlign: 'center',
            color: 'text.secondary',
            fontWeight: 600,
            fontSize: '0.875rem',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          Actions rapides
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4, justifyContent: 'center' }}>
          {buttons.map((btn) => (
            <Grid item xs={6} sm={4} md={2} key={btn.label} sx={{ display: 'flex' }}>
              <ActionButton btn={btn} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}
