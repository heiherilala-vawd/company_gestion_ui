import { Toolbar, SaveButton } from 'react-admin'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const FormToolbar = () => {
  const navigate = useNavigate()

  return (
    <Toolbar sx={{ mb: { xs: 8, sm: 9 } }}>
      <Button onClick={() => navigate(-1)} sx={{ mr: 'auto' }}>
        Retour
      </Button>
      <SaveButton />
    </Toolbar>
  )
}

export default FormToolbar
