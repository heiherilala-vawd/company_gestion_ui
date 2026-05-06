import React from 'react'
import {
  Create,
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  DateInput,
  NumberInput,
  BooleanInput,
  useNotify,
  useRedirect,
  SaveButton,
  DeleteButton,
  Toolbar,
} from 'react-admin'
import { Box, Card, CardContent, Typography, Stack, Button, alpha } from '@mui/material'
import { Save as SaveIcon, Delete as DeleteIcon } from '@mui/icons-material'
import {
  colors,
  gradients,
  shadows,
  borderRadius as br,
  transitions,
  getShadow,
} from '../style/themeConfig'

interface StyledFormProps {
  title?: string
  children: React.ReactNode
  resource?: string
  id?: string | number
  [key: string]: any
}

export const StyledCreate = ({ title, children, ...props }: StyledFormProps) => {
  return (
    <Create
      title={title}
      sx={{
        '& .RaCreate-main': {
          backgroundColor: 'transparent',
          boxShadow: 'none',
        },
      }}
      {...props}
    >
      <Card
        sx={{
          borderRadius: br.lg,
          boxShadow: (theme) => getShadow(theme.palette.mode as 'light' | 'dark', 'sm'),
          border: (theme) =>
            theme.palette.mode === 'light'
              ? `1px solid ${colors.light.divider}`
              : `1px solid ${colors.dark.divider}`,
          overflow: 'hidden',
        }}
      >
        {title && (
          <Box
            sx={{
              p: 3,
              borderBottom: (theme) =>
                theme.palette.mode === 'light'
                  ? `1px solid ${colors.light.divider}`
                  : `1px solid ${colors.dark.divider}`,
              backgroundColor: (theme) =>
                theme.palette.mode === 'light' ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {title}
            </Typography>
          </Box>
        )}
        <CardContent sx={{ p: { xs: 2, md: 3 } }}>
          <StyledSimpleForm>{children}</StyledSimpleForm>
        </CardContent>
      </Card>
    </Create>
  )
}

export const StyledEdit = ({ title, children, ...props }: StyledFormProps) => {
  return (
    <Edit
      title={title}
      sx={{
        '& .RaEdit-main': {
          backgroundColor: 'transparent',
          boxShadow: 'none',
        },
      }}
      {...props}
    >
      <Card
        sx={{
          borderRadius: br.lg,
          boxShadow: (theme) => getShadow(theme.palette.mode as 'light' | 'dark', 'sm'),
          border: (theme) =>
            theme.palette.mode === 'light'
              ? `1px solid ${colors.light.divider}`
              : `1px solid ${colors.dark.divider}`,
          overflow: 'hidden',
        }}
      >
        {title && (
          <Box
            sx={{
              p: 3,
              borderBottom: (theme) =>
                theme.palette.mode === 'light'
                  ? `1px solid ${colors.light.divider}`
                  : `1px solid ${colors.dark.divider}`,
              backgroundColor: (theme) =>
                theme.palette.mode === 'light' ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {title}
            </Typography>
          </Box>
        )}
        <CardContent sx={{ p: { xs: 2, md: 3 } }}>
          <StyledSimpleForm>{children}</StyledSimpleForm>
        </CardContent>
      </Card>
    </Edit>
  )
}

export const StyledSimpleForm = ({
  children,
  ...props
}: {
  children: React.ReactNode
  [key: string]: any
}) => {
  return (
    <SimpleForm
      sx={{
        '& .RaSimpleForm-form': {
          gap: 2,
        },
      }}
      {...props}
    >
      {children}
    </SimpleForm>
  )
}

export const StyledTextInput = (props: any) => {
  return (
    <TextInput
      {...props}
      sx={{
        '& .MuiFormControl-root': {
          backgroundColor: (theme) =>
            theme.palette.mode === 'light' ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)',
          borderRadius: br.sm,
          transition: transitions.default,
          '&:hover': {
            backgroundColor: (theme) =>
              theme.palette.mode === 'light' ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.04)',
          },
        },
        ...props.sx,
      }}
    />
  )
}

export const StyledSelectInput = (props: any) => {
  return (
    <SelectInput
      {...props}
      sx={{
        '& .MuiFormControl-root': {
          borderRadius: 2,
        },
        ...props.sx,
      }}
    />
  )
}

export const StyledDateInput = (props: any) => {
  return (
    <DateInput
      {...props}
      sx={{
        '& .MuiFormControl-root': {
          borderRadius: 2,
        },
        ...props.sx,
      }}
    />
  )
}

export const StyledNumberInput = (props: any) => {
  return (
    <NumberInput
      {...props}
      sx={{
        '& .MuiFormControl-root': {
          borderRadius: 2,
        },
        ...props.sx,
      }}
    />
  )
}

export const StyledBooleanInput = (props: any) => {
  return (
    <BooleanInput
      {...props}
      sx={{
        '& .MuiFormControl-root': {
          borderRadius: 2,
        },
        ...props.sx,
      }}
    />
  )
}

export const StyledToolbar = (props: any) => {
  return (
    <Toolbar
      {...props}
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 2,
        p: 2,
        borderTop: (theme) =>
          theme.palette.mode === 'light'
            ? `1px solid ${colors.light.divider}`
            : `1px solid ${colors.dark.divider}`,
        backgroundColor: (theme) =>
          theme.palette.mode === 'light' ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)',
        ...props.sx,
      }}
    >
      <Button
        variant="outlined"
        onClick={() => window.history.back()}
        sx={{
          borderRadius: br.sm,
          textTransform: 'none',
          fontWeight: 500,
        }}
      >
        Annuler
      </Button>
      <SaveButton
        sx={{
          borderRadius: br.sm,
          textTransform: 'none',
          fontWeight: 500,
          background: gradients.primary,
          '&:hover': {
            background: gradients.primary,
            filter: 'brightness(1.1)',
          },
        }}
      />
      {props.record && (
        <DeleteButton
          sx={{
            borderRadius: br.sm,
            textTransform: 'none',
            fontWeight: 500,
          }}
        />
      )}
    </Toolbar>
  )
}
