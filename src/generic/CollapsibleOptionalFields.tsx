import { useState } from 'react'
import { Button, Collapse, Box } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

export default function CollapsibleOptionalFields({
  children,
  designation,
}: {
  children: React.ReactNode
  designation?: string
}) {
  const [open, setOpen] = useState(true)

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          onClick={() => setOpen(!open)}
          endIcon={open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          sx={{
            textTransform: 'none',
            fontSize: '0.75rem',
            color: 'text.secondary',
          }}
        >
          Options avancées{designation ? ` ${designation}` : ''}
        </Button>
      </Box>
      <Collapse
        in={open}
        sx={{
          width: '100%',
          '& .MuiCollapse-wrapper': { width: '100%' },
          '& .MuiCollapse-wrapperInner': { width: '100%' },
        }}
      >
        <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
          {children}
        </Box>
      </Collapse>
    </>
  )
}
