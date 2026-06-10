import {
  DateField,
  FunctionField,
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  useRecordContext,
  useNotify,
  useRefresh,
  useRedirect,
} from 'react-admin'
import {
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField as MuiTextField,
} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import ReplyIcon from '@mui/icons-material/Reply'
import { useState } from 'react'
import { getMiddleUrlDynamicCompanyResource } from '../../../config/dynamicResources'

function ConsumptionActions() {
  const record = useRecordContext()
  const notify = useNotify()
  const refresh = useRefresh()
  const redirect = useRedirect()
  const [returnDialogOpen, setReturnDialogOpen] = useState(false)
  const [returnQty, setReturnQty] = useState<number>(record?.quantity || 0)

  if (!record || record.consumption_status !== 'IN_PROGRESS') return null

  const apiBase = getMiddleUrlDynamicCompanyResource('material_consumption')
  const token = localStorage.getItem('token')
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }

  const handleComplete = async () => {
    try {
      const res = await fetch(`${apiBase}/${record.id}/complete`, {
        method: 'PUT',
        headers,
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      notify('Consommation terminée', { type: 'success' })
      refresh()
      redirect('list', 'material_consumption')
    } catch (err: any) {
      notify(`Erreur : ${err.message}`, { type: 'error' })
    }
  }

  const handleReturn = async () => {
    try {
      const res = await fetch(`${apiBase}/${record.id}/return?quantity=${returnQty}`, {
        method: 'PUT',
        headers,
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      notify('Retour effectué', { type: 'success' })
      setReturnDialogOpen(false)
      refresh()
      redirect('list', 'material_consumption')
    } catch (err: any) {
      notify(`Erreur : ${err.message}`, { type: 'error' })
    }
  }

  return (
    <>
      <Stack direction="row" spacing={2} mt={2}>
        <Button
          variant="contained"
          color="success"
          startIcon={<CheckIcon />}
          onClick={handleComplete}
        >
          Terminer
        </Button>
        <Button
          variant="contained"
          color="warning"
          startIcon={<ReplyIcon />}
          onClick={() => setReturnDialogOpen(true)}
        >
          Retour
        </Button>
      </Stack>
      <Dialog open={returnDialogOpen} onClose={() => setReturnDialogOpen(false)}>
        <DialogTitle>Retour de matériaux</DialogTitle>
        <DialogContent>
          <MuiTextField
            label="Quantité à retourner"
            type="number"
            fullWidth
            value={returnQty}
            onChange={(e) => setReturnQty(Number(e.target.value))}
            inputProps={{ min: 1, max: record.quantity }}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReturnDialogOpen(false)}>Annuler</Button>
          <Button variant="contained" onClick={handleReturn}>
            Valider le retour
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default function MaterialConsumptionShow() {
  return (
    <Show title="Détails consommation matériau">
      <SimpleShowLayout>
        <TextField source="id" />
        <FunctionField
          label="Matériau"
          render={(record) => record.material?.name || record.material_id || ''}
        />
        <FunctionField
          label="Entrepôt"
          render={(record) => record.warehouse?.name || record.warehouse_id || ''}
        />
        <NumberField source="quantity" label="Quantité" />
        <FunctionField
          label="Date consommation"
          render={(record) =>
            record.consumption_date
              ? new Date(record.consumption_date).toLocaleDateString('fr-FR')
              : ''
          }
        />
        <FunctionField
          label="Travail"
          render={(record) => record.job?.description || record.job_id || ''}
        />
        <FunctionField
          label="Statut"
          render={(record) => {
            const statusMap: Record<string, string> = {
              COMPLETED: 'Terminé',
              IN_PROGRESS: 'En cours',
              CANCELLED: 'Annulé',
            }
            return statusMap[record.consumption_status] || record.consumption_status || ''
          }}
        />
        <TextField source="reason" label="Raison" />
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
        <ConsumptionActions />
      </SimpleShowLayout>
    </Show>
  )
}
