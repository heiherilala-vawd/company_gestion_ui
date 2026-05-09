import { TextInput } from 'react-admin'
import generateId from '../../../../utili/utils.tsx'
import {
  renderTravelExpenseSelect,
  renderUserSelect,
} from '../../../../generic/SelectWithCreateProvider.tsx'

// eslint-disable-next-line react/prop-types
export default function TravelPeopleForm({ isCreate = false, isCreateForm = false }) {
  return (
    <>
      {isCreate && (
        <TextInput
          source="id"
          readOnly
          defaultValue={generateId()}
          sx={{ display: 'none' }}
          data-testid="input-id"
        />
      )}{' '}
      {isCreateForm && <TextInput source="newId" readOnly defaultValue={generateId()} />}
      {renderTravelExpenseSelect(null, null)}
      {renderUserSelect(null, null)}
      <TextInput source="comment" label="Commentaire" multiline data-testid="input-comment" />
    </>
  )
}
