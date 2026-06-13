import { useState } from 'react'
import { useNotify } from 'react-admin'
import { TextField, Button, Card, CardContent, Typography, Box, Alert } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import generateId from '../../../utili/utils.tsx'
import { getAuthHeaders } from '../../../auth/authProvider'

export default function UserCreateBulk() {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ created: number; errors: string[] } | null>(null)
  const notify = useNotify()
  const navigate = useNavigate()

  const handleSubmit = async () => {
    const lines = input
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)

    if (lines.length === 0) {
      notify('Veuillez entrer au moins un nom', { type: 'error' })
      return
    }

    const users = lines.map((line) => {
      const parts = line.split(/\s+/)
      const firstName = parts[0] || ''
      const lastName = parts.slice(1).join(' ') || ''
      const email = `${firstName.toLowerCase()}.${lastName.toLowerCase().replace(/\s+/g, '.')}@company.com`
      return {
        id: generateId(),
        first_name: firstName,
        last_name: lastName,
        email,
        sex: 'M',
        company_id: localStorage.getItem('currentCompanyId') || '',
      }
    })

    setLoading(true)
    const errors: string[] = []
    let created = 0

    const API_URL = import.meta.env.VITE_API_URL ?? ''
    const companyId = localStorage.getItem('currentCompanyId')
    const userId = localStorage.getItem('user_id')
    const baseUrl = `${API_URL}/users/${userId}/companies/${companyId}/users`

    for (const user of users) {
      try {
        const response = await fetch(baseUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders(),
          },
          body: JSON.stringify([user]),
        })
        if (response.ok) {
          created++
        } else {
          const err = await response.json().catch(() => ({}))
          errors.push(`${user.first_name} ${user.last_name}: ${err.message || response.status}`)
        }
      } catch (e: unknown) {
        errors.push(
          `${user.first_name} ${user.last_name}: ${e instanceof Error ? e.message : 'Erreur réseau'}`,
        )
      }
    }

    setLoading(false)
    setResult({ created, errors })

    if (created > 0) {
      notify(`${created} utilisateur(s) créé(s) avec succès`, { type: 'success' })
    }
    if (errors.length > 0) {
      notify(`${errors.length} erreur(s) lors de la création`, { type: 'error' })
    }
  }

  return (
    <Card sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
          Création en masse d'utilisateurs
        </Typography>
        <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
          Entrez un prénom et nom par ligne. Les emails seront générés automatiquement sous la forme
          prenom.nom@company.com.
        </Typography>
        <TextField
          label="Liste des utilisateurs"
          placeholder={'Jean Dupont\nMarie Martin\nPierre Durand'}
          multiline
          minRows={6}
          maxRows={20}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          fullWidth
          data-testid="input-bulk-users"
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            data-testid="submit-bulk-create"
          >
            {loading ? 'Création...' : 'Créer les utilisateurs'}
          </Button>
          <Button variant="outlined" onClick={() => navigate(-1)}>
            Retour
          </Button>
        </Box>
        {result && (
          <Alert severity={result.errors.length === 0 ? 'success' : 'warning'}>
            {result.created} utilisateur(s) créé(s).
            {result.errors.length > 0 && ` ${result.errors.length} erreur(s).`}
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}
