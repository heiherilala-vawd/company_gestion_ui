import React, { useState } from 'react'
import { useNotify, useAuthProvider } from 'react-admin'
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import { colors, gradients, getShadow, transitions, borderRadius as br } from '../style/themeConfig'
import generateId from '../utili/utils.tsx'
import CollapsibleOptionalFields from '../generic/CollapsibleOptionalFields'

export const RegisterPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [sex, setSex] = useState<'M' | 'F'>('M')
  const [id] = useState(generateId)

  const [loading, setLoading] = useState(false)
  const notify = useNotify()
  const authProvider = useAuthProvider()
  const navigate = useNavigate()
  const theme = useTheme()
  const mode = theme.palette.mode as 'light' | 'dark'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setPasswordError('Les mots de passe ne correspondent pas')
      notify('Les mots de passe ne correspondent pas', { type: 'error' })
      return
    }
    setPasswordError('')
    setLoading(true)
    try {
      await authProvider.register({
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        sex,
        id,
      })
      notify('Compte créé avec succès', { type: 'success' })
      navigate('/')
    } catch (error: unknown) {
      notify(
        typeof error === 'string'
          ? error
          : error instanceof Error
            ? error.message
            : "Erreur lors de l'inscription",
        { type: 'error' },
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: 'background.default',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background:
            mode === 'light'
              ? 'radial-gradient(ellipse at 30% 20%, rgba(99, 102, 241, 0.04) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(245, 158, 11, 0.03) 0%, transparent 50%)'
              : 'radial-gradient(ellipse at 30% 20%, rgba(99, 102, 241, 0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(245, 158, 11, 0.05) 0%, transparent 50%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Card
        sx={{
          maxWidth: 420,
          width: '100%',
          mx: 2,
          borderRadius: br.xl,
          boxShadow: getShadow(mode, 'dialog'),
          position: 'relative',
          overflow: 'visible',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: gradients.primaryHorizontal,
            borderRadius: `${br.xl}px ${br.xl}px 0 0`,
          },
        }}
      >
        <CardContent sx={{ px: { xs: 3, sm: 4 }, pt: { xs: 4, sm: 5 }, pb: { xs: 3, sm: 4 } }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: gradients.primary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2,
                boxShadow: getShadow(mode, 'primary'),
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5, letterSpacing: '-0.02em' }}>
              Créer un compte
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Rejoignez GestPro
            </Typography>
          </Box>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}
          >
            <TextField
              label="ID"
              defaultValue={id}
              sx={{ display: 'none' }}
              fullWidth
            />
            <TextField
              label="Prénom"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Nom"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Mot de passe"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Confirmer le mot de passe"
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value)
                setPasswordError('')
              }}
              error={!!passwordError}
              helperText={passwordError}
              required
              fullWidth
            />
            <CollapsibleOptionalFields designation="">
              <FormControl fullWidth>
                <InputLabel>Sexe</InputLabel>
                <Select
                  value={sex}
                  label="Sexe"
                  onChange={(e) => setSex(e.target.value as 'M' | 'F')}
                  inputProps={{ 'data-testid': 'input-sex' }}
                >
                  <MenuItem value="M">Masculin</MenuItem>
                  <MenuItem value="F">Féminin</MenuItem>
                </Select>
              </FormControl>
            </CollapsibleOptionalFields>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              fullWidth
              sx={{
                background: gradients.primary,
                borderRadius: br.md,
                textTransform: 'none',
                fontWeight: 600,
                py: 1.5,
                fontSize: '0.9375rem',
                mt: 1,
                transition: transitions.default,
                boxShadow: getShadow(mode, 'primary'),
                '&:hover': {
                  background: gradients.primary,
                  filter: 'brightness(1.1)',
                  boxShadow: getShadow(mode, 'primaryHover'),
                  transform: 'translateY(-1px)',
                },
              }}
            >
              {loading ? 'Inscription...' : "S'inscrire"}
            </Button>
            <Button
              variant="text"
              onClick={() => navigate('/login')}
              sx={{
                textTransform: 'none',
                fontWeight: 500,
                color: colors.primary.main,
                fontSize: '0.875rem',
                transition: transitions.default,
                '&:hover': {
                  bgcolor: 'transparent',
                  color: colors.primary.dark,
                },
              }}
            >
              Déjà un compte ? Connectez-vous
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}
