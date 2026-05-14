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
import { colors, gradients, getShadow, transitions } from '../style/themeConfig'
import generateId from '../utili/utils.tsx'

export const RegisterPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [sex, setSex] = useState<'M' | 'F'>('M')
  const [id, setId] = useState('')

  const [loading, setLoading] = useState(false)
  const notify = useNotify()
  const authProvider = useAuthProvider()
  const navigate = useNavigate()
  const theme = useTheme()
  const mode = theme.palette.mode as 'light' | 'dark'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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
      }}
    >
      <Card
        sx={{
          maxWidth: 420,
          width: '100%',
          mx: 2,
          borderRadius: 2,
          boxShadow: getShadow(mode, 'lg'),
        }}
      >
        <CardContent sx={{ px: 3, pb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, textAlign: 'center' }}>
            Créer un compte
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            {' '}
            <TextField
              label="ID"
              value={generateId()}
              onChange={(e) => setId(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
            />
            <FormControl fullWidth required>
              <InputLabel>Sexe</InputLabel>
              <Select
                value={sex}
                label="Sexe"
                onChange={(e) => setSex(e.target.value as 'M' | 'F')}
              >
                <MenuItem value="M">Masculin</MenuItem>
                <MenuItem value="F">Féminin</MenuItem>
              </Select>
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              fullWidth
              sx={{
                background: gradients.primary,
                borderRadius: 1.5,
                textTransform: 'none',
                fontWeight: 600,
                py: 1.2,
                mt: 1,
                transition: transitions.default,
                '&:hover': {
                  background: gradients.primary,
                  filter: 'brightness(1.1)',
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

export default RegisterPage
