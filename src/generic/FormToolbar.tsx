import { Toolbar, SaveButton } from 'react-admin'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const FormToolbar = () => {
  const navigate = useNavigate()

  return (
    <Toolbar>
      <SaveButton />
      <Button onClick={() => navigate(-1)} sx={{ ml: 1 }}>
        Retour
      </Button>
    </Toolbar>
  )
}

export default FormToolbar
