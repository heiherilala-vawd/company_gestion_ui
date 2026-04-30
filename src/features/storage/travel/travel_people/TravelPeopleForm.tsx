import { TextInput } from 'react-admin'
import ReferenceSelectWithCreate from '../../../../generic/ReferenceSelectWithCreate'
import generateId from '../../../../utili/utils.tsx'

// eslint-disable-next-line react/prop-types
export default function TravelPeopleForm({ isCreate = false, isCreateForm = false }) {
  return (
    <>
      {isCreate && <TextInput source="id" readOnly defaultValue={generateId()} />}
      {isCreateForm && <TextInput source="newId" readOnly defaultValue={generateId()} />}
      <ReferenceSelectWithCreate
        source="travel_id"
        reference="travel_expenses"
        label="Voyage"
        optionText="title"
      />
      <TextInput source="person_name" label="Nom de la personne" />
      <TextInput source="comment" label="Commentaire" multiline />
    </>
  )
}
