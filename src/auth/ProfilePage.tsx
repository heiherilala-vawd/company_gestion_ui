import { useState, useEffect } from 'react'
import { useNotify } from 'react-admin'
import {
  Card,
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
import { profileStyles } from '../style/components'

const ROLE_LABELS: Record<string, string> = {
  ADMIN: 'Admin',
  ADMINISTRATION: 'Administration',
  WAREHOUSE_WORKER: 'Magasinier',
  EMPLOYEE: 'Employé',
}

const SEX_LABELS: Record<string, string> = {
  M: 'Homme',
  F: 'Femme',
}

function getInitials(first: string, last: string): string {
  return ((first?.[0] || '') + (last?.[0] || '')).toUpperCase() || '?'
}

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
        const headers = {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        }
        const whoamiRes = await fetch(`${API_URL}/auth/whoami`, { headers })
        if (!whoamiRes.ok) throw new Error('whoami failed')
        const whoami = await whoamiRes.json()
        const userIdFromWhoami = whoami.id || userId
        if (!userIdFromWhoami) throw new Error('no user id')
        const userRes = await fetch(`${API_URL}/users/${userIdFromWhoami}`, { headers })
        if (!userRes.ok) throw new Error('user fetch failed')
        const data = await userRes.json()
        setUser(data)
        setForm({
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          email: data.email || '',
          sex: data.sex || 'M',
        })
      } catch {
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
      const response = await fetch(`${API_URL}/users?company_id=${companyId}`, {
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
      setUser((prev: any) => ({ ...prev, ...form }))
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
    return (
      <Box sx={profileStyles.page}>
        <Typography sx={{ mt: 8 }} variant="body1" color="text.secondary">
          Chargement...
        </Typography>
      </Box>
    )
  }

  const roleLabel = ROLE_LABELS[user.role || localStorage.getItem('user_role') || ''] || user.role

  const formatDate = (d: string | null | undefined) =>
    d ? new Date(d).toLocaleDateString('fr-FR') : '—'

  const fieldData = [
    { label: 'Email', value: form.email },
    { label: 'Prénom', value: form.first_name },
    { label: 'Nom', value: form.last_name },
    { label: 'Sexe', value: SEX_LABELS[form.sex] || form.sex },
    { label: 'Entreprise', value: user.company?.name || '—' },
    {
      label: 'Manager',
      value: user.manager ? `${user.manager.first_name} ${user.manager.last_name}` : '—',
    },
    { label: 'Département', value: user.department?.name || '—' },
    { label: 'Date naissance', value: formatDate(user.birth_date) },
    { label: 'Commentaire', value: user.comment || '—' },
  ]

  return (
    <Box sx={profileStyles.page}>
      <Card sx={profileStyles.card}>
        <Box sx={profileStyles.header}>
          <Box sx={profileStyles.avatar}>
            <Typography sx={profileStyles.avatarText}>
              {getInitials(form.first_name, form.last_name)}
            </Typography>
          </Box>
          <Typography sx={profileStyles.name}>
            {form.first_name} {form.last_name}
          </Typography>
          <Box sx={profileStyles.roleBadge}>{roleLabel}</Box>
        </Box>

        <Box sx={profileStyles.body}>
          {!editing ? (
            <>
              {fieldData.map((field) => (
                <Box key={field.label} sx={profileStyles.fieldRow}>
                  <Typography sx={profileStyles.fieldLabel}>{field.label}</Typography>
                  <Typography sx={profileStyles.fieldValue}>{field.value}</Typography>
                </Box>
              ))}
              <Box sx={profileStyles.actions}>
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
                  Mot de passe
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Box sx={profileStyles.editFields}>
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
              </Box>
              <Box sx={profileStyles.actions}>
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
            </>
          )}
        </Box>
      </Card>
    </Box>
  )
}
