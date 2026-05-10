import { TextInput, NumberInput } from 'react-admin'
import generateId from '../../../utili/utils.tsx'
import { renderJobSelect } from '../../../generic/SelectWithCreateProvider.tsx'

// eslint-disable-next-line react/prop-types
export default function ExpenseForm({ isCreate = false, isCreateForm = false, souce = '' }) {
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
      {renderJobSelect(null, 'Chantier')}
      <NumberInput source={souce + 'amount'} label="Montant" data-testid="input-amount" />
      <TextInput
        source={souce + 'description'}
        label="Description"
        multiline
        data-testid="input-description"
      />
      <TextInput
        source={souce + 'comment'}
        label="Commentaire"
        multiline
        data-testid="input-comment"
      />
    </>
  )
}
