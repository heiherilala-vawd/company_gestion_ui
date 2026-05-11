import React, { useState } from 'react'
import { useLogin, useNotify, useTranslate } from 'react-admin'
import { Box, Button, Card, Avatar, CardContent, CircularProgress, TextField } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock'
import { useNavigate } from 'react-router-dom'

export const CustomLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const login = useLogin()
  const notify = useNotify()
  const translate = useTranslate()
  const navigate = useNavigate()

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
      }}
    >
      <Card
        sx={{
          minWidth: 300,
          mt: { xs: 2, sm: 8 },
          mx: 'auto',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Avatar sx={{ bgcolor: 'secondary.main' }}>
            <LockIcon />
          </Avatar>
        </Box>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: 300,
            p: 2,
            pb: '16px !important',
          }}
        >
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
          <Button variant="contained" type="submit" color="primary" disabled={loading} fullWidth>
            {loading ? (
              <CircularProgress size={19} thickness={3} sx={{ my: 0.3 }} />
            ) : (
              translate('ra.auth.sign_in')
            )}
          </Button>
        </Box>
        <Box sx={{ textAlign: 'center', pb: 2 }}>
          <Button
            variant="text"
            color="primary"
            onClick={() => navigate('/register')}
            sx={{ textTransform: 'none' }}
          >
            {translate('ra.auth.create_account', { _: 'Créer un compte' })}
          </Button>
        </Box>
      </Card>
    </Box>
  )
}

export default CustomLogin
