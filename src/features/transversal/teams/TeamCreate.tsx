import { SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import TeamForm from './TeamForm'
import GenericCreate from '../../../generic/GenericCreate'

export default function TeamCreate() {
  return (
    <GenericCreate
      transform={(data) => ({
        ...data,
        company_id: localStorage.getItem('currentCompanyId'),
      })}
    >
      <SimpleForm id="team-create-form" toolbar={<FormToolbar />}>
        <TeamForm isCreate />
      </SimpleForm>
    </GenericCreate>
  )
}
