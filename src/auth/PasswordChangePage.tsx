import { useState } from 'react'
import { useNotify } from 'react-admin'
import { TextField, Button, Card, CardContent, Typography, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { changePassword } from './authProvider'

export default function PasswordChangePage() {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const notify = useNotify()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmNewPassword) {
      setError('Les mots de passe ne correspondent pas')
      return
    }
    if (newPassword.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères')
      return
    }
    setError('')
    setLoading(true)
    try {
      await changePassword(oldPassword, newPassword)
      notify('Mot de passe changé avec succès', { type: 'success' })
      navigate('/')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erreur lors du changement de mot de passe'
      setError(msg)
      notify(msg, { type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card sx={{ maxWidth: 480, mx: 'auto', mt: 4 }}>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
          Changer le mot de passe
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            label="Ancien mot de passe"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
            fullWidth
            data-testid="input-old-password"
          />
          <TextField
            label="Nouveau mot de passe"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            fullWidth
            data-testid="input-new-password"
          />
          <TextField
            label="Confirmer le nouveau mot de passe"
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            error={!!error}
            helperText={error}
            required
            fullWidth
            data-testid="input-confirm-new-password"
          />
          <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              data-testid="submit-password-change"
            >
              {loading ? 'Changement...' : 'Changer le mot de passe'}
            </Button>
            <Button variant="outlined" onClick={() => navigate(-1)}>
              Retour
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
