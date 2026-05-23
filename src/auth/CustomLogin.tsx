import React, { useState } from 'react'
import { useLogin, useNotify, useTranslate } from 'react-admin'
import { Box, Button, Card, CircularProgress, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import { gradients, getShadow, transitions, colors, borderRadius as br } from '../style/themeConfig'

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
        justifyContent: 'center',
        bgcolor: 'background.default',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background:
            mode === 'light'
              ? 'radial-gradient(ellipse at 30% 20%, rgba(45, 110, 145, 0.04) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(212, 96, 92, 0.03) 0%, transparent 50%)'
              : 'radial-gradient(ellipse at 30% 20%, rgba(45, 110, 145, 0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(212, 96, 92, 0.05) 0%, transparent 50%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 400,
          mx: 2,
          borderRadius: br.xl,
          boxShadow: getShadow(mode, 'dialog'),
          position: 'relative',
          overflow: 'visible',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: gradients.primaryHorizontal,
            borderRadius: `${br.xl}px ${br.xl}px 0 0`,
          },
        }}
      >
        <Box sx={{ px: { xs: 3, sm: 4 }, pt: { xs: 4, sm: 5 }, pb: { xs: 3, sm: 4 } }}>
          <Box sx={{ textAlign: 'center', mb: 3.5 }}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: gradients.primary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2.5,
                boxShadow: getShadow(mode, 'primary'),
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Box>
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5, letterSpacing: '-0.02em' }}
            >
              {translate('ra.auth.sign_in')}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Gérez votre entreprise efficacement
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              autoFocus
              label={translate('ra.auth.username')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              sx={{ mb: 2.5 }}
            />
            <TextField
              type="password"
              label={translate('ra.auth.password')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              sx={{ mb: 3.5 }}
            />
            <Button
              variant="contained"
              type="submit"
              color="primary"
              disabled={loading}
              fullWidth
              sx={{
                background: gradients.primary,
                borderRadius: br.md,
                textTransform: 'none',
                fontWeight: 600,
                py: 1.5,
                fontSize: '0.9375rem',
                transition: transitions.default,
                boxShadow: getShadow(mode, 'primary'),
                '&:hover': {
                  background: gradients.primary,
                  filter: 'brightness(1.1)',
                  boxShadow: getShadow(mode, 'primaryHover'),
                  transform: 'translateY(-1px)',
                },
                '&:active': {
                  transform: 'translateY(0)',
                },
              }}
            >
              {loading ? (
                <CircularProgress size={20} thickness={3} sx={{ color: '#fff', my: 0.2 }} />
              ) : (
                translate('ra.auth.sign_in')
              )}
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            textAlign: 'center',
            pb: { xs: 3, sm: 4 },
            borderTop: `1px solid ${mode === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)'}`,
            pt: 2.5,
            mx: { xs: 3, sm: 4 },
          }}
        >
          <Button
            variant="text"
            onClick={() => navigate('/register')}
            sx={{
              textTransform: 'none',
              fontWeight: 500,
              color: colors.primary.main,
              fontSize: '0.875rem',
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
