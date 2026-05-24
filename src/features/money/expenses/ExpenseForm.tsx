import { TextInput, NumberInput } from 'react-admin'
import generateId from '../../../utili/utils.tsx'
import { renderJobSelect } from '../../../generic/SelectWithCreateProvider.tsx'

export default function ExpenseForm({
  isCreate = false,
  isCreateForm = false,
  souce = '',
  description = '',
}) {
  return (
    <>
      {isCreate && (
        <TextInput
          source={souce + 'id'}
          readOnly
          defaultValue={generateId()}
          data-testid="input-id"
        />
      )}{' '}
      {isCreateForm && <TextInput source={souce + 'newId'} readOnly defaultValue={generateId()} />}
      {!isCreate && renderJobSelect(souce + 'job_id', 'Travail')}
      <NumberInput source={souce + 'amount'} label="Montant" data-testid="input-amount" />
      {description === '' ? (
        <TextInput
          source={souce + 'description'}
          label="Description"
          multiline
          data-testid="input-description"
        />
      ) : (
        <TextInput
          source={souce + 'description'}
          label="Description"
          multiline
          data-testid="input-description"
          defaultValue={description}
          sx={{ display: 'none' }}
        />
      )}
      <TextInput
        source={souce + 'comment'}
        label="Commentaire"
        multiline
        data-testid="input-comment"
      />
    </>
  )
}
