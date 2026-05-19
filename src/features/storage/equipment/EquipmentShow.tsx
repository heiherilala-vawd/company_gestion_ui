import { useState } from 'react'
import { useShowContext } from 'react-admin'
import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  DateField,
  BooleanField,
  FunctionField,
  Button,
} from 'react-admin'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField as MuiTextField,
  Button as MuiButton,
} from '@mui/material'
import BuildIcon from '@mui/icons-material/Build'
import { getMiddleUrlDynamicJobResource } from '../../../config/dynamicResources'
import generateId from '../../../utili/utils.tsx'

function MaintenanceDialog({
  open,
  onClose,
  equipmentId,
}: {
  open: boolean
  onClose: () => void
  equipmentId?: string
}) {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!equipmentId) return
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const url = getMiddleUrlDynamicJobResource('equipment') + '/' + equipmentId + '/maintenances'
      const body = [
        {
          id: generateId(),
          description,
          expense: {
            id: generateId(),
            amount: Number(amount),
            description: 'Maintenance: ' + description,
            comment,
            job_id: localStorage.getItem('currentJobId'),
          },
        },
      ]
      await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(body),
      })
      onClose()
    } catch (err) {
      console.error('Maintenance failed:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Nouvel entretien</DialogTitle>
      <DialogContent>
        <MuiTextField
          fullWidth
          margin="dense"
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={3}
          data-testid="input-maintenance-description"
        />
        <MuiTextField
          fullWidth
          margin="dense"
          label="Montant"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          data-testid="input-maintenance-amount"
        />
        <MuiTextField
          fullWidth
          margin="dense"
          label="Commentaire"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          multiline
          rows={2}
          data-testid="input-maintenance-comment"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
        <Button onClick={handleSubmit} disabled={loading || !description || !amount}>
          Effectuer l'entretien
        </Button>
      </DialogActions>
    </Dialog>
  )
}

function MaintenanceButton() {
  const { record } = useShowContext()
  const [open, setOpen] = useState(false)
  return (
    <>
      <MuiButton
        variant="contained"
        startIcon={<BuildIcon />}
        onClick={() => setOpen(true)}
        sx={{ mt: 2 }}
        data-testid="maintenance-button"
      >
        Maintenir
      </MuiButton>
      <MaintenanceDialog open={open} onClose={() => setOpen(false)} equipmentId={record?.id} />
    </>
  )
}

function ShowContent() {
  return (
    <>
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="name" label="Nom" />
        <TextField source="description" label="Description" />
        <TextField source="warehouse.name" label="ID Entrepôt" />
        <NumberField source="floor_number" label="Étage" />
        <NumberField source="storage_number" label="Emplacement" />
        <TextField source="comment" label="Commentaire" />
        <BooleanField source="est_en_panne" label="Hors d'usage" />
        <DateField source="created_at" label="Créé le" showTime />
        <DateField source="updated_at" label="Modifié le" showTime />
        <FunctionField
          label="Créé par"
          render={(record) => (
            <span>
              {record.created_by?.first_name} {record.created_by?.last_name}
            </span>
          )}
        />
        <FunctionField
          label="Modifié par"
          render={(record) => (
            <span>
              {record.updated_by?.first_name} {record.updated_by?.last_name}
            </span>
          )}
        />
      </SimpleShowLayout>
      <MaintenanceButton />
    </>
  )
}

export default function EquipmentShow() {
  return (
    <Show title="Détails équipement">
      <ShowContent />
    </Show>
  )
}
