import { TextInput } from 'react-admin'
import ReferenceSelectWithCreate from '../../../generic/ReferenceSelectWithCreate'
import generateId from '../../../utili/utils.tsx'

// eslint-disable-next-line react/prop-types
export default function OtherExpenseForm({ isCreate = false, isCreateForm = false }) {
  return (
    <>
      {isCreate && <TextInput source="id" readOnly defaultValue={generateId()} />}
      {isCreateForm && <TextInput source="newId" readOnly defaultValue={generateId()} />}

      <ReferenceSelectWithCreate
        source="expense_id"
        reference="expenses"
        label="Dépense"
        optionText="description"
      />
      <TextInput source="description" label="Description" multiline />
    </>
  )
}
