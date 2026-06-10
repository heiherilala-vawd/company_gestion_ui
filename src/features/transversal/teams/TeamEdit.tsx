import { SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import TeamForm from './TeamForm'
import GenericEdit from '../../../generic/GenericEdit'

export default function TeamEdit() {
  return (
    <GenericEdit
      queryOptions={{
        select: (data) => ({
          ...data,
          leader_id: data.leader?.id,
          member_ids: data.members?.map((m: any) => m.id) || [],
        }),
      }}
    >
      <SimpleForm id="team-edit-form" toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <TeamForm />
      </SimpleForm>
    </GenericEdit>
  )
}
