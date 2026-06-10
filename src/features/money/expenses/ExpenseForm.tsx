import { TextInput, NumberInput, required } from 'react-admin'
import generateId from '../../../utili/utils.tsx'
import { renderJobSelect } from '../../../generic/SelectWithCreateProvider.tsx'
import CollapsibleOptionalFields from '../../../generic/CollapsibleOptionalFields'
import { useFormContext } from 'react-hook-form'
import { useEffect } from 'react'

export default function ExpenseForm({
  isCreate = false,
  isCreateForm = false,
  souce = '',
  description = '',
}) {
  const { setValue } = useFormContext()

  useEffect(() => {
    if (description !== '') {
      setValue(souce + '_generated_desc', description)
    }
  }, [description, souce, setValue])

  return (
    <>
      {isCreate && (
        <TextInput
          source={souce + 'id'}
          sx={{ display: 'none' }}
          defaultValue={generateId()}
          data-testid="input-id"
        />
      )}
      {isCreateForm && (
        <TextInput source={souce + 'newId'} sx={{ display: 'none' }} defaultValue={generateId()} />
      )}
      {isCreate ? (
        <TextInput
          source={souce + 'job_id'}
          sx={{ display: 'none' }}
          defaultValue={localStorage.getItem('currentJobId')}
        />
      ) : (
        renderJobSelect(souce + 'job_id', 'Travail')
      )}
      <NumberInput source={souce + 'amount'} label="Montant" data-testid="input-amount" />
      {description === '' ? (
        <TextInput
          source={souce + 'description'}
          label="Description"
          multiline
          validate={[required()]}
          data-testid="input-description"
        />
      ) : (
        <>
          <TextInput
            source={souce + '_generated_desc'}
            sx={{ display: 'none' }}
            data-testid="input-generated_desc"
          />
          <CollapsibleOptionalFields designation="description">
            <TextInput
              source={souce + 'description'}
              label="Description"
              multiline
              data-testid="input-description"
            />
          </CollapsibleOptionalFields>
        </>
      )}
      <CollapsibleOptionalFields designation="commentaire">
        <TextInput
          source={souce + 'comment'}
          label="Commentaire"
          multiline
          data-testid="input-comment"
        />
      </CollapsibleOptionalFields>
    </>
  )
}
