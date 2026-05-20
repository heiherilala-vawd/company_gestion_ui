import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
  NumberField,
  FunctionField,
  useUpdate,
  useNotify,
  useRefresh,
  useRedirect,
  useRecordContext,
} from 'react-admin'
import { Button, Stack } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'

const statusColors: Record<string, string> = {
  PENDING: '#FF9800',
  APPROVED: '#4CAF50',
  REJECTED: '#F44336',
  CANCELLED: '#9E9E9E',
}

function LeaveActions() {
  const record = useRecordContext()
  const [update, { isLoading }] = useUpdate()
  const notify = useNotify()
  const refresh = useRefresh()
  const redirect = useRedirect()

  if (!record || record.status !== 'PENDING') return null

  const handleApprove = () => {
    update(
      'leaves',
      { id: record.id, data: { id: record.id, status: 'APPROVED' }, previousData: record },
      {
        onSuccess: () => {
          notify('Congé approuvé', { type: 'success' })
          refresh()
          redirect('list', 'leaves')
        },
        onError: () => notify("Erreur lors de l'approbation", { type: 'error' }),
      },
    )
  }

  const handleReject = () => {
    update(
      'leaves',
      { id: record.id, data: { id: record.id, status: 'REJECTED' }, previousData: record },
      {
        onSuccess: () => {
          notify('Congé refusé', { type: 'success' })
          refresh()
          redirect('list', 'leaves')
        },
        onError: () => notify('Erreur lors du refus', { type: 'error' }),
      },
    )
  }

  return (
    <Stack direction="row" spacing={2} mt={2}>
      <Button
        variant="contained"
        color="success"
        startIcon={<CheckIcon />}
        onClick={handleApprove}
        disabled={isLoading}
      >
        Approuver
      </Button>
      <Button
        variant="contained"
        color="error"
        startIcon={<CloseIcon />}
        onClick={handleReject}
        disabled={isLoading}
      >
        Refuser
      </Button>
    </Stack>
  )
}

export default function LeaveShow() {
  return (
    <Show title="Détails du congé">
      <SimpleShowLayout>
        <FunctionField
          label="Employé"
          render={(record: any) => record.user?.first_name + ' ' + record.user?.last_name || ''}
        />
        <TextField source="leave_type.name" label="Type de congé" />
        <DateField source="start_date" label="Début" />
        <DateField source="end_date" label="Fin" />
        <NumberField source="duration_days" label="Durée (jours)" />
        <FunctionField
          label="Statut"
          render={(record: any) => (
            <span style={{ color: statusColors[record.status] || '#000', fontWeight: 'bold' }}>
              {record.status === 'PENDING' && 'En attente'}
              {record.status === 'APPROVED' && 'Approuvé'}
              {record.status === 'REJECTED' && 'Rejeté'}
              {record.status === 'CANCELLED' && 'Annulé'}
            </span>
          )}
        />
        <TextField source="reason" label="Motif" />
        <FunctionField
          label="Approuvé par"
          render={(record: any) =>
            record.approved_by?.first_name + ' ' + record.approved_by?.last_name || '-'
          }
        />
        <DateField source="approved_at" label="Approuvé le" showTime />
        <FunctionField
          label="Créé par"
          render={(record: any) =>
            record.created_by?.first_name + ' ' + record.created_by?.last_name || '-'
          }
        />
        <DateField source="created_at" label="Créé le" showTime />
        <DateField source="updated_at" label="Modifié le" showTime />
        <LeaveActions />
      </SimpleShowLayout>
    </Show>
  )
}
