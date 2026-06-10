import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Popover,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Box,
  Tooltip,
  Divider,
  CircularProgress,
} from '@mui/material'
import { Notification, fetchNotifications } from './api'
import NotificationDetailDialog from './NotificationDetailDialog'

interface Props {
  anchorEl: HTMLElement | null
  onClose: () => void
  onRefresh: () => void
}

export default function NotificationDropdown({ anchorEl, onClose, onRefresh }: Props) {
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState<Notification | null>(null)

  useEffect(() => {
    if (!anchorEl) return
    setLoading(true)
    fetchNotifications(1, 5)
      .then(setNotifications)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [anchorEl])

  const handleNotificationClick = (notif: Notification) => {
    setSelected(notif)
  }

  const handleDialogClose = () => {
    setSelected(null)
    onClose()
  }

  const handleActionDone = () => {
    setSelected(null)
    onRefresh()
  }

  const handleSeeAll = () => {
    onClose()
    navigate('/notifications')
  }

  const formatRelative = (dateStr: string) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    if (diffMins < 1) return "À l'instant"
    if (diffMins < 60) return `Il y a ${diffMins} min`
    const diffHours = Math.floor(diffMins / 60)
    if (diffHours < 24) return `Il y a ${diffHours}h`
    const diffDays = Math.floor(diffHours / 24)
    if (diffDays < 7) return `Il y a ${diffDays}j`
    return date.toLocaleDateString('fr-FR')
  }

  return (
    <>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: { width: 360, maxHeight: 420, borderRadius: 2, mt: 1 },
          },
        }}
      >
        <Box sx={{ px: 2, py: 1.5, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="subtitle2" fontWeight={600}>
            Notifications
          </Typography>
        </Box>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress size={24} />
          </Box>
        ) : notifications.length === 0 ? (
          <Box sx={{ py: 4, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Aucune notification
            </Typography>
          </Box>
        ) : (
          <List disablePadding>
            {notifications.map((notif) => (
              <Tooltip key={notif.id} title={notif.message} placement="left" arrow>
                <ListItemButton
                  onClick={() => handleNotificationClick(notif)}
                  sx={{
                    borderLeft: 3,
                    borderColor: notif.read ? 'transparent' : 'primary.main',
                    bgcolor: notif.read ? 'transparent' : 'action.hover',
                  }}
                >
                  <ListItemText
                    primary={notif.title}
                    secondary={
                      <>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          noWrap
                          sx={{ display: 'block', mb: 0.25 }}
                        >
                          {notif.message}
                        </Typography>
                        <Typography variant="caption" color="text.disabled">
                          {formatRelative(notif.created_at)}
                        </Typography>
                      </>
                    }
                    primaryTypographyProps={{
                      variant: 'body2',
                      fontWeight: notif.read ? 400 : 600,
                    }}
                  />
                </ListItemButton>
              </Tooltip>
            ))}
          </List>
        )}
        <Divider />
        <Box sx={{ p: 1.5, textAlign: 'center' }}>
          <Typography
            component="button"
            onClick={handleSeeAll}
            variant="body2"
            color="primary"
            sx={{
              border: 'none',
              bgcolor: 'transparent',
              cursor: 'pointer',
              fontWeight: 500,
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            Voir toutes les notifications
          </Typography>
        </Box>
      </Popover>

      {selected && (
        <NotificationDetailDialog
          notification={selected}
          onClose={handleDialogClose}
          onActionDone={handleActionDone}
        />
      )}
    </>
  )
}
