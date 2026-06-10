import { TextInput } from 'react-admin'
import generateId from '../../../../utili/utils.tsx'
import {
  renderTravelExpenseSelect,
  renderUserSelect,
} from '../../../../generic/SelectWithCreateProvider.tsx'
import CollapsibleOptionalFields from '../../../../generic/CollapsibleOptionalFields'
import React from 'react'

export default function TravelPeopleForm({ isCreate = false, isCreateForm = false }) {
  return (
    <>
      {isCreate && (
        <TextInput
          source="id"
          sx={{ display: 'none' }}
          defaultValue={generateId()}
          data-testid="input-id"
        />
      )}{' '}
      {isCreateForm && (
        <TextInput source="newId" sx={{ display: 'none' }} defaultValue={generateId()} />
      )}
      {renderTravelExpenseSelect(null, null, !isCreate)}
      {renderUserSelect(null, null)}
      <CollapsibleOptionalFields>
        <TextInput source="comment" label="Commentaire" multiline data-testid="input-comment" />
      </CollapsibleOptionalFields>
    </>
  )
}
