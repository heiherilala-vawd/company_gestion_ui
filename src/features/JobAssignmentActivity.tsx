import { useState } from 'react'
import { Form, ReferenceInput, SelectInput, useNotify, useGetList } from 'react-admin'
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate } from 'react-router'
import { getMiddleUrl } from '../config/dynamicResources'
import generateId from '../utili/utils'
import { operationFormStyles } from '../style/components'

export default function JobAssignmentActivity() {
  const notify = useNotify()
  const navigate = useNavigate()

  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [jobId, setJobId] = useState<string | null>(null)

  const { data: users = [] } = useGetList('users', {
    pagination: { page: 1, perPage: 100 },
  })

  const handleToggle = (userId: string) => {
    const currentIndex = selectedUsers.indexOf(userId)
    const newSelected = [...selectedUsers]
    if (currentIndex === -1) {
      newSelected.push(userId)
    } else {
      newSelected.splice(currentIndex, 1)
    }
    setSelectedUsers(newSelected)
  }

  const onSubmit = async () => {
    if (!jobId) {
      notify('Veuillez sélectionner un travail', { type: 'warning' })
      return
    }
    if (selectedUsers.length === 0) {
      notify('Veuillez sélectionner au moins un employé', { type: 'warning' })
      return
    }

    const token = localStorage.getItem('token')
    if (!token) {
      notify("Token d'authentification manquant", { type: 'error' })
      return
    }

    const url = getMiddleUrl('job_users')
    let successCount = 0

    for (const userId of selectedUsers) {
      const id = generateId()
      const payload = [{ id, job_id: jobId, user_id: userId }]

      try {
        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.message || `Erreur HTTP ${response.status}`)
        }

        successCount++
      } catch (error: any) {
        console.error(error)
        notify(`Erreur pour l'utilisateur ${userId}: ${error.message}`, { type: 'error' })
      }
    }

    if (successCount > 0) {
      notify(`${successCount} employé(s) assigné(s) avec succès !`, { type: 'success' })
      navigate('/')
    }
  }

  return (
    <Card sx={operationFormStyles.card}>
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
          Assigner un travail
        </Typography>

        <Form onSubmit={onSubmit}>
          <Box sx={operationFormStyles.flexRow}>
            <ReferenceInput
              source="job_id"
              reference="jobs"
              label="Travail"
              onChange={(e: any) => setJobId(e?.id || e?.target?.value || null)}
            >
              <SelectInput
                optionText="description"
                sx={operationFormStyles.flexFull}
                data-testid="input-job_id"
              />
            </ReferenceInput>
          </Box>

          <Typography
            variant="body2"
            sx={{ mt: 3, mb: 1, fontWeight: 500, color: 'text.secondary' }}
          >
            Sélectionner les employés
          </Typography>
          <List dense data-testid="employee-list">
            {users.map((user: any) => (
              <ListItem
                key={user.id}
                button
                onClick={() => handleToggle(user.id)}
                data-testid={`employee-item-${user.id}`}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={selectedUsers.indexOf(user.id) !== -1}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText primary={`${user.last_name} ${user.first_name}`} />
              </ListItem>
            ))}
          </List>

          <Box sx={operationFormStyles.submitBox}>
            <Button type="submit" variant="contained" color="primary" data-testid="submit-assign">
              Assigner ({selectedUsers.length})
            </Button>
            <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')} sx={{ ml: 1 }}>
              Retour
            </Button>
          </Box>
        </Form>
      </CardContent>
    </Card>
  )
}
