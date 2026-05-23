import React, { useState } from 'react'
import { ReferenceInput, SelectInput, useDataProvider, useNotify, useRefresh } from 'react-admin'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Box,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { FormProvider, useForm } from 'react-hook-form'

interface Props {
  source: string
  reference: string
  label?: string
  optionText?: string | ((record: any) => string)
  filter?: Record<string, any>
  sort?: { field: string; order: string }
  perPage?: number
  createUrlEnd?: string
  createForm?: React.ReactNode
  onSuccess?: (newRecord: any) => void
  extractionPath?: string
  sx?: Record<string, any>
}

export default function ReferenceSelectWithCreate({
  source,
  reference,
  label,
  optionText,
  filter,
  sort = { field: 'name', order: 'ASC' },
  perPage = 100,
  createUrlEnd,
  createForm,
  onSuccess,
  extractionPath,
  sx,
}: Props) {
  const refresh = useRefresh()
  const [dialogOpen, setDialogOpen] = useState(false)
  const methods = useForm()
  const dataProvider = useDataProvider()
  const notify = useNotify()

  const onSubmit = async (data: any) => {
    let extractedData = data
    if (extractionPath) {
      if (Array.isArray(data[extractionPath]) && data[extractionPath].length > 0) {
        extractedData = data[extractionPath][0]
        console.log('Données extraites:', extractedData)
      } else {
        console.warn(`Le chemin "${extractionPath}" n'existe pas ou n'est pas un tableau`)
        notify('Erreur: Structure de données invalide', { type: 'error' })
        return
      }
    }

    extractedData.id = extractedData.newId
    delete extractedData.newId

    const token = localStorage.getItem('token')
    try {
      if (createUrlEnd) {
        const response = await fetch(createUrlEnd, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify([extractedData]),
        })
        if (!response.ok) throw new Error('Erreur')
        const newRecord = await response.json()
        if (onSuccess) onSuccess(newRecord)
      } else {
        await dataProvider.create(reference, { extractedData })
      }
      notify('Création réussie', { type: 'success' })
      setDialogOpen(false)
      refresh()
      methods.reset()
    } catch (error: any) {
      notify(`Erreur: ${error.message}`, { type: 'error' })
    }
  }

  return (
    <>
      <Box
        display="flex"
        alignItems="flex-start"
        gap={1}
        data-testid={'input-' + reference + '-id'}
        sx={{ width: '100%', ...sx }}
      >
        <Box
          flex={1}
          sx={{
            minWidth: 0,
            '& .MuiSelect-select, & .MuiNativeSelect-select': {
              whiteSpace: 'normal !important' as any,
              overflowWrap: 'break-word !important',
              height: 'auto !important',
              minHeight: 'auto !important',
            },
          }}
        >
          <ReferenceInput
            source={source}
            reference={reference}
            filter={filter}
            sort={sort}
            perPage={perPage}
            optionText={optionText}
          >
            <SelectInput optionText={optionText} label={label} fullWidth />
          </ReferenceInput>
        </Box>
        {createForm && (
          <IconButton
            onClick={() => setDialogOpen(true)}
            color="primary"
            sx={{ flexShrink: 0, mt: 0.5 }}
          >
            <AddIcon />
          </IconButton>
        )}
      </Box>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <DialogTitle>Créer un nouveau {label || reference}</DialogTitle>
            <DialogContent>
              <Box mt={1}>{createForm}</Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDialogOpen(false)}>Annuler</Button>
              <Button type="submit" variant="contained" color="primary">
                Créer
              </Button>
            </DialogActions>
          </form>
        </FormProvider>
      </Dialog>
    </>
  )
}
