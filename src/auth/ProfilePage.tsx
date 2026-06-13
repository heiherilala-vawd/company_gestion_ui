import { useState, useEffect } from 'react'
import { useNotify } from 'react-admin'
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { getAuthHeaders } from './authProvider'

export default function ProfilePage() {
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '', sex: 'M' })
  const notify = useNotify()
  const navigate = useNavigate()

  const userId = localStorage.getItem('user_id')
  const API_URL = import.meta.env.VITE_API_URL ?? ''

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch(`${API_URL}/auth/whoami`, {
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        })
        if (response.ok) {
          const data = await response.json()
          setUser(data)
          setForm({
            first_name: data.first_name || '',
            last_name: data.last_name || '',
            email: data.email || '',
            sex: data.sex || 'M',
          })
        }
      } catch {
        // fallback to localStorage
        setUser({
          email: localStorage.getItem('user_email'),
          role: localStorage.getItem('user_role'),
          id: userId,
        })
      }
    }
    fetchProfile()
  }, [API_URL, userId])

  const handleSave = async () => {
    setLoading(true)
    try {
      const companyId = localStorage.getItem('currentCompanyId')
      const payload = [{ id: userId, ...form, company_ids: companyId ? [companyId] : [] }]
      const response = await fetch(`${API_URL}/users/${userId}/companies/${companyId}/users`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify(payload),
      })
      if (!response.ok) {
        const err = await response.json().catch(() => ({}))
        throw new Error(err.message || 'Erreur lors de la mise à jour')
      }
      notify('Profil mis à jour avec succès', { type: 'success' })
      setEditing(false)
    } catch (err: unknown) {
      notify(err instanceof Error ? err.message : 'Erreur lors de la mise à jour', {
        type: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return <Typography sx={{ p: 4 }}>Chargement...</Typography>
  }

  return (
    <Card sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
          Mon profil
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            ID: {user.id}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Rôle: {user.role || localStorage.getItem('user_role')}
          </Typography>
        </Box>

        {!editing ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Email" value={form.email} disabled fullWidth />
            <TextField label="Prénom" value={form.first_name} disabled fullWidth />
            <TextField label="Nom" value={form.last_name} disabled fullWidth />
            <FormControl fullWidth disabled>
              <InputLabel>Sexe</InputLabel>
              <Select value={form.sex} label="Sexe">
                <MenuItem value="M">Homme</MenuItem>
                <MenuItem value="F">Femme</MenuItem>
              </Select>
            </FormControl>
            <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
              <Button
                variant="contained"
                onClick={() => setEditing(true)}
                data-testid="edit-profile-button"
              >
                Modifier
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/profile/password')}
                data-testid="change-password-button"
              >
                Changer le mot de passe
              </Button>
            </Box>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              fullWidth
              data-testid="input-profile-email"
            />
            <TextField
              label="Prénom"
              value={form.first_name}
              onChange={(e) => setForm({ ...form, first_name: e.target.value })}
              fullWidth
              data-testid="input-profile-first_name"
            />
            <TextField
              label="Nom"
              value={form.last_name}
              onChange={(e) => setForm({ ...form, last_name: e.target.value })}
              fullWidth
              data-testid="input-profile-last_name"
            />
            <FormControl fullWidth>
              <InputLabel>Sexe</InputLabel>
              <Select
                value={form.sex}
                label="Sexe"
                onChange={(e) => setForm({ ...form, sex: e.target.value })}
                inputProps={{ 'data-testid': 'input-profile-sex' }}
              >
                <MenuItem value="M">Homme</MenuItem>
                <MenuItem value="F">Femme</MenuItem>
              </Select>
            </FormControl>
            <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
              <Button
                variant="contained"
                onClick={handleSave}
                disabled={loading}
                data-testid="save-profile-button"
              >
                {loading ? 'Enregistrement...' : 'Enregistrer'}
              </Button>
              <Button variant="outlined" onClick={() => setEditing(false)}>
                Annuler
              </Button>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}
