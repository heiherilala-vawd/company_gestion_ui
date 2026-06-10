import { useState, useEffect, useCallback, useRef } from 'react'
import { IconButton, Badge, Tooltip } from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { fetchUnreadCount } from './api'
import NotificationDropdown from './NotificationDropdown'

export default function NotificationBell() {
  const [unreadCount, setUnreadCount] = useState(0)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval>>()

  const refreshCount = useCallback(() => {
    fetchUnreadCount()
      .then(setUnreadCount)
      .catch(() => {})
  }, [])

  useEffect(() => {
    refreshCount()
    intervalRef.current = setInterval(refreshCount, 30000)
    return () => clearInterval(intervalRef.current)
  }, [refreshCount, refreshKey])

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleRefresh = () => {
    setRefreshKey((k) => k + 1)
  }

  return (
    <>
      <Tooltip title="Notifications">
        <IconButton
          onClick={handleClick}
          color="inherit"
          size="small"
          sx={{
            color: 'text.secondary',
            width: 36,
            height: 36,
            '&:hover': { color: 'primary.main' },
          }}
        >
          <Badge badgeContent={unreadCount} color="error" max={99}>
            <NotificationsIcon fontSize="small" />
          </Badge>
        </IconButton>
      </Tooltip>
      <NotificationDropdown anchorEl={anchorEl} onClose={handleClose} onRefresh={handleRefresh} />
    </>
  )
}
