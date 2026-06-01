import { useState } from 'react'
import { Form, TextInput, ReferenceInput, SelectInput, useNotify, useGetList } from 'react-admin'
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

export default function TeamActivity() {
  const notify = useNotify()
  const navigate = useNavigate()

  const [selectedUsers, setSelectedUsers] = useState<string[]>([])

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

  const onSubmit = async (data: any) => {
    if (!data.name) {
      notify("Veuillez entrer un nom pour l'équipe", { type: 'warning' })
      return
    }
    if (selectedUsers.length === 0) {
      notify('Veuillez sélectionner au moins un membre', { type: 'warning' })
      return
    }

    const token = localStorage.getItem('token')
    if (!token) {
      notify("Token d'authentification manquant", { type: 'error' })
      return
    }

    const id = generateId()
    const url = getMiddleUrl('teams')
    const payload = [
      {
        id,
        name: data.name,
        leader_id: data.leader_id,
        member_ids: selectedUsers,
      },
    ]

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

      notify('Équipe créée avec succès !', { type: 'success' })
      navigate('/')
    } catch (error: any) {
      console.error(error)
      notify(`Erreur : ${error.message}`, { type: 'error' })
    }
  }

  return (
    <Card sx={operationFormStyles.card}>
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
          Nouvelle Équipe
        </Typography>

        <Form onSubmit={onSubmit}>
          <Box sx={operationFormStyles.flexRow}>
            <TextInput
              source="name"
              label="Nom de l'équipe"
              sx={operationFormStyles.flexFull}
              data-testid="input-name"
            />
          </Box>
          <Box sx={operationFormStyles.flexRow}>
            <ReferenceInput source="leader_id" reference="users" label="Responsable">
              <SelectInput
                optionText={(record: any) => `${record.first_name} ${record.last_name}`}
                sx={operationFormStyles.flexFull}
                data-testid="input-leader_id"
              />
            </ReferenceInput>
          </Box>

          <Typography
            variant="body2"
            sx={{ mt: 3, mb: 1, fontWeight: 500, color: 'text.secondary' }}
          >
            Sélectionner les membres
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
            <Button type="submit" variant="contained" color="primary" data-testid="submit-team">
              Créer l'équipe ({selectedUsers.length})
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
