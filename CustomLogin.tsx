// CustomLogin.tsx
import * as React from 'react'
import { Login, useLogin, useNotify } from 'react-admin'
import { Button, Box, Typography, TextField, MenuItem, CircularProgress } from '@mui/material'
import { useState } from 'react'

const CustomLoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [sex, setSex] = useState<'M' | 'F'>('M')
  const [isRegistering, setIsRegistering] = useState(false)
  const [loading, setLoading] = useState(false)

  const login = useLogin()
  const notify = useNotify()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await login({ email, password })
    } catch (error) {
      notify('Email ou mot de passe incorrect', { type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const getNewUserId = () => {
    // Prefer native UUID when available
    if (typeof crypto !== 'undefined' && (crypto as any).randomUUID) {
      return (crypto as any).randomUUID()
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0
      const v = c === 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const newUserId = getNewUserId()

    try {
      const response = await fetch('/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: newUserId,
          email,
          password,
          first_name: firstName,
          last_name: lastName,
          sex,
        }),
      })

      if (response.ok) {
        const data = await response.json()

        // Stocker les infos d'authentification
        localStorage.setItem('token', data.token)
        localStorage.setItem('user_id', data.id)
        localStorage.setItem('user_email', data.email)
        localStorage.setItem('user_role', data.role)
        localStorage.removeItem('not_authenticated')

        // Auto-connexion avec React Admin
        await login({ email, password })
        notify('Inscription et connexion réussies !', { type: 'success' })

        // Rediriger vers l'accueil
        window.location.href = '/'
      } else {
        const error = await response.json().catch(() => ({}))
        notify(error.message || "Erreur lors de l'inscription", { type: 'error' })
      }
    } catch (error) {
      console.error('Registration error:', error)
      notify('Erreur réseau', { type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  if (isRegistering) {
    return (
      <Box component="form" onSubmit={handleRegister} sx={{ mt: 1, p: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Inscription
        </Typography>
        <TextField
          fullWidth
          label="Email"
          type="email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        <TextField
          fullWidth
          label="Mot de passe"
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />
        <TextField
          fullWidth
          label="Prénom"
          margin="normal"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          disabled={loading}
        />
        <TextField
          fullWidth
          label="Nom"
          margin="normal"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          disabled={loading}
        />
        <TextField
          fullWidth
          select
          label="Sexe"
          margin="normal"
          value={sex}
          onChange={(e) => setSex(e.target.value as 'M' | 'F')}
          disabled={loading}
        >
          <MenuItem value="M">Homme</MenuItem>
          <MenuItem value="F">Femme</MenuItem>
        </TextField>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2, mb: 1 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "S'inscrire"}
        </Button>
        <Button fullWidth onClick={() => setIsRegistering(false)} disabled={loading}>
          Déjà un compte ? Se connecter
        </Button>
      </Box>
    )
  }

  return (
    <Box component="form" onSubmit={handleLogin} sx={{ mt: 1, p: 3 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Connexion
      </Typography>
      <TextField
        fullWidth
        label="Email"
        type="email"
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={loading}
      />
      <TextField
        fullWidth
        label="Mot de passe"
        type="password"
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        disabled={loading}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 1 }} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : 'Se connecter'}
      </Button>
      <Button fullWidth onClick={() => setIsRegistering(true)} disabled={loading}>
        Pas encore de compte ? S'inscrire
      </Button>
    </Box>
  )
}

export const CustomLogin = () => (
  <Login>
    <CustomLoginForm />
  </Login>
)
