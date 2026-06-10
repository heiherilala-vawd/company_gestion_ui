import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useNotify } from 'react-admin'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  Stack,
} from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import CloseIcon from '@mui/icons-material/Close'
import { Notification, markAsRead, markAsComplete, deleteNotification } from './api'

interface Props {
  notification: Notification
  onClose: () => void
  onActionDone: () => void
}

export default function NotificationDetailDialog({ notification, onClose, onActionDone }: Props) {
  const navigate = useNavigate()
  const notify = useNotify()
  const [loading, setLoading] = useState(false)

  const handleRead = async () => {
    if (notification.read) return
    try {
      await markAsRead(notification.id)
    } catch {
      notify('Erreur lors du marquage comme lu', { type: 'error' })
    }
  }

  const handleComplete = async () => {
    setLoading(true)
    try {
      await markAsComplete(notification.id)
      notify('Notification marquée comme complétée', { type: 'success' })
      setActionTaken(true)
      onActionDone()
      onClose()
    } catch {
      notify('Erreur lors de la complétion', { type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    setLoading(true)
    try {
      await deleteNotification(notification.id)
      notify('Notification supprimée', { type: 'success' })
      setActionTaken(true)
      onActionDone()
      onClose()
    } catch {
      notify('Erreur lors de la suppression', { type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const handleViewTask = () => {
    if (!notification.task_id) return
    onClose()
    navigate(`/tasks/${notification.task_id}`)
  }

  const formatDateTime = (dateStr: string | null) => {
    if (!dateStr) return '—'
    return new Date(dateStr).toLocaleString('fr-FR')
  }

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth onTransitionEntered={handleRead}>
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
          <Typography variant="h6" sx={{ flex: 1, fontWeight: 600 }}>
            {notification.title}
          </Typography>
          <Chip
            label={notification.read ? 'Lu' : 'Non lu'}
            color={notification.read ? 'default' : 'primary'}
            size="small"
          />
          <Chip
            label={notification.completed ? 'Complété' : 'En cours'}
            color={notification.completed ? 'success' : 'warning'}
            size="small"
          />
        </Box>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <Box>
            <Typography variant="caption" color="text.secondary" fontWeight={600}>
              Message
            </Typography>
            <Typography variant="body2" sx={{ mt: 0.5, whiteSpace: 'pre-wrap' }}>
              {notification.message}
            </Typography>
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <Box>
              <Typography variant="caption" color="text.secondary" fontWeight={600}>
                Créée le
              </Typography>
              <Typography variant="body2">{formatDateTime(notification.created_at)}</Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary" fontWeight={600}>
                Lue le
              </Typography>
              <Typography variant="body2">{formatDateTime(notification.read_at)}</Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary" fontWeight={600}>
                Complétée le
              </Typography>
              <Typography variant="body2">{formatDateTime(notification.completed_at)}</Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary" fontWeight={600}>
                Tâche associée
              </Typography>
              <Typography variant="body2">{notification.task_id || 'Aucune'}</Typography>
            </Box>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button onClick={onClose} startIcon={<CloseIcon />} color="inherit">
          Fermer
        </Button>
        {notification.task_id && (
          <Button onClick={handleViewTask} startIcon={<VisibilityIcon />} color="info">
            Voir la tâche
          </Button>
        )}
        {!notification.completed && (
          <Button
            onClick={handleComplete}
            startIcon={<CheckCircleIcon />}
            color="success"
            disabled={loading}
          >
            Marquer complétée
          </Button>
        )}
        <Button
          onClick={handleDelete}
          startIcon={<DeleteIcon />}
          color="error"
          variant="contained"
          disabled={loading}
        >
          Supprimer
        </Button>
      </DialogActions>
    </Dialog>
  )
}
