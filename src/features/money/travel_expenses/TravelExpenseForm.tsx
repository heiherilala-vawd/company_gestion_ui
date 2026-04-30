import { TextInput, DateInput } from 'react-admin'
import ReferenceSelectWithCreate from '../../../generic/ReferenceSelectWithCreate'
import generateId from '../../../utili/utils.tsx'

// eslint-disable-next-line react/prop-types
export default function TravelExpenseForm({ isCreate = false, isCreateForm = false }) {
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
      <TextInput source="departure_location" label="Lieu de départ" />
      <TextInput source="arrival_location" label="Lieu d'arrivée" />
      <DateInput source="departure_date" label="Date de départ" />
      <DateInput source="arrival_date" label="Date d'arrivée" />
    </>
  )
}
