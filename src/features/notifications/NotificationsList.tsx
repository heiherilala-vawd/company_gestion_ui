import { useState, useEffect, useCallback } from 'react'
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Chip,
  CircularProgress,
} from '@mui/material'
import { Notification, fetchNotifications } from './api'
import NotificationDetailDialog from './NotificationDetailDialog'

export default function NotificationsList() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(25)
  const [refreshKey, setRefreshKey] = useState(0)
  const [selected, setSelected] = useState<Notification | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const data = await fetchNotifications(page + 1, rowsPerPage)
      setNotifications(data)
    } catch {
      setNotifications([])
    } finally {
      setLoading(false)
    }
  }, [page, rowsPerPage])

  useEffect(() => {
    load()
  }, [load, refreshKey])

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10))
    setPage(0)
  }

  const handleRowClick = (notif: Notification) => {
    setSelected(notif)
  }

  const handleDialogClose = () => {
    setSelected(null)
  }

  const handleActionDone = () => {
    setSelected(null)
    setRefreshKey((k) => k + 1)
  }

  const formatDateTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
        Notifications
      </Typography>

      <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress />
          </Box>
        ) : notifications.length === 0 ? (
          <Box sx={{ py: 6, textAlign: 'center' }}>
            <Typography color="text.secondary">Aucune notification</Typography>
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Titre</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Message</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Statut</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {notifications.map((notif) => (
                <TableRow
                  key={notif.id}
                  hover
                  onClick={() => handleRowClick(notif)}
                  sx={{
                    cursor: 'pointer',
                    bgcolor: notif.read ? 'transparent' : 'action.hover',
                    '&:hover': { bgcolor: 'action.selected' },
                  }}
                >
                  <TableCell>
                    <Typography variant="body2" fontWeight={notif.read ? 400 : 600}>
                      {notif.title}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      noWrap
                      sx={{ maxWidth: 300 }}
                    >
                      {notif.message}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={notif.read ? 'Lu' : 'Non lu'}
                      color={notif.read ? 'default' : 'primary'}
                      size="small"
                      sx={{ mr: 0.5 }}
                    />
                    <Chip label="En cours" color="warning" size="small" />
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption" color="text.secondary">
                      {formatDateTime(notif.created_at)}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <TablePagination
          component="div"
          count={-1}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[10, 25, 50]}
          labelDisplayedRows={({ from, to }) => `${from}-${to}`}
          labelRowsPerPage="Lignes par page"
        />
      </TableContainer>

      {selected && (
        <NotificationDetailDialog
          notification={selected}
          onClose={handleDialogClose}
          onActionDone={handleActionDone}
        />
      )}
    </Box>
  )
}
