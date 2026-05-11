import React, { useState } from 'react'
import { useLogin, useNotify, useTranslate } from 'react-admin'
import { Box, Button, Card, Avatar, CircularProgress, TextField, Typography } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import { gradients, getShadow, transitions, colors } from '../style/themeConfig'

export const CustomLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const login = useLogin()
  const notify = useNotify()
  const translate = useTranslate()
  const navigate = useNavigate()
  const theme = useTheme()
  const mode = theme.palette.mode as 'light' | 'dark'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    login({ username: email, password })
      .then(() => setLoading(false))
      .catch((error) => {
        setLoading(false)
        notify(
          typeof error === 'string'
            ? error
            : typeof error === 'undefined' || !error.message
              ? 'ra.auth.sign_in_error'
              : error.message,
          { type: 'error' },
        )
      })
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'flex-start',
        bgcolor: 'background.default',
      }}
    >
      <Card
        sx={{
          minWidth: 300,
          mt: { xs: 2, sm: 8 },
          mx: 'auto',
          borderRadius: 2,
          boxShadow: getShadow(mode, 'lg'),
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 1 }}>
          <Avatar
            sx={{
              bgcolor: colors.primary.main,
              width: 48,
              height: 48,
            }}
          >
            <LockIcon />
          </Avatar>
        </Box>
        <Box component="form" onSubmit={handleSubmit} sx={{ width: 300, px: 3, pb: 2 }}>
          <TextField
            autoFocus
            label={translate('ra.auth.username')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            type="password"
            label={translate('ra.auth.password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            type="submit"
            color="primary"
            disabled={loading}
            fullWidth
            sx={{
              background: gradients.primary,
              borderRadius: 1.5,
              textTransform: 'none',
              fontWeight: 600,
              py: 1.2,
              transition: transitions.default,
              '&:hover': {
                background: gradients.primary,
                filter: 'brightness(1.1)',
              },
            }}
          >
            {loading ? (
              <CircularProgress size={19} thickness={3} sx={{ my: 0.3 }} />
            ) : (
              translate('ra.auth.sign_in')
            )}
          </Button>
        </Box>
        <Box sx={{ textAlign: 'center', pb: 2.5 }}>
          <Button
            variant="text"
            onClick={() => navigate('/register')}
            sx={{
              textTransform: 'none',
              fontWeight: 500,
              color: colors.primary.main,
              transition: transitions.default,
              '&:hover': {
                bgcolor: 'transparent',
                color: colors.primary.dark,
              },
            }}
          >
            {translate('ra.auth.create_account', { _: 'Créer un compte' })}
          </Button>
        </Box>
      </Card>
    </Box>
  )
}

export default CustomLogin
