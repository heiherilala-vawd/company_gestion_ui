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
  SaveButton,
  DeleteButton,
  Toolbar,
} from 'react-admin'
import { Box, Card, CardContent, Typography, Button } from '@mui/material'
import { formStyles } from '../style/components'

interface StyledFormProps {
  title?: string
  children: React.ReactNode
  resource?: string
  id?: string | number
  [key: string]: unknown
}

export const StyledCreate = ({ title, children, ...props }: StyledFormProps) => {
  return (
    <Create title={title} sx={formStyles.page} {...props}>
      <Card sx={formStyles.card}>
        {title && (
          <Box sx={formStyles.titleBox}>
            <Typography variant="h6" sx={formStyles.titleText}>
              {title}
            </Typography>
          </Box>
        )}
        <CardContent sx={formStyles.cardContent}>
          <StyledSimpleForm>{children}</StyledSimpleForm>
        </CardContent>
      </Card>
    </Create>
  )
}

export const StyledEdit = ({ title, children, ...props }: StyledFormProps) => {
  return (
    <Edit title={title} sx={formStyles.page} {...props}>
      <Card sx={formStyles.card}>
        {title && (
          <Box sx={formStyles.titleBox}>
            <Typography variant="h6" sx={formStyles.titleText}>
              {title}
            </Typography>
          </Box>
        )}
        <CardContent sx={formStyles.cardContent}>
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
  [key: string]: unknown
}) => {
  return (
    <SimpleForm sx={formStyles.simpleForm} {...props}>
      {children}
    </SimpleForm>
  )
}

export const StyledTextInput = (props: Record<string, unknown>) => {
  return (
    <TextInput
      {...props}
      sx={{
        ...formStyles.textInputRoot,
        ...props.sx,
      }}
    />
  )
}

export const StyledSelectInput = (props: Record<string, unknown>) => {
  return (
    <SelectInput
      {...props}
      sx={{
        ...formStyles.inputRoot,
        ...props.sx,
      }}
    />
  )
}

export const StyledDateInput = (props: Record<string, unknown>) => {
  return (
    <DateInput
      {...props}
      sx={{
        ...formStyles.inputRoot,
        ...props.sx,
      }}
    />
  )
}

export const StyledNumberInput = (props: Record<string, unknown>) => {
  return (
    <NumberInput
      {...props}
      sx={{
        ...formStyles.inputRoot,
        ...props.sx,
      }}
    />
  )
}

export const StyledBooleanInput = (props: Record<string, unknown>) => {
  return (
    <BooleanInput
      {...props}
      sx={{
        ...formStyles.inputRoot,
        ...props.sx,
      }}
    />
  )
}

export const StyledToolbar = (props: Record<string, unknown>) => {
  return (
    <Toolbar
      {...props}
      sx={{
        ...formStyles.toolbar,
        ...props.sx,
      }}
    >
      <Button variant="outlined" onClick={() => window.history.back()} sx={formStyles.cancelButton}>
        Annuler
      </Button>
      <SaveButton sx={formStyles.saveButton} />
      {props.record && <DeleteButton sx={formStyles.deleteButton} />}
    </Toolbar>
  )
}
