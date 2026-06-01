import { Create, SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import TeamForm from './TeamForm'

export default function TeamCreate() {
  return (
    <Create
      redirect="list"
      transform={(data) => ({
        ...data,
        company_id: localStorage.getItem('currentCompanyId'),
      })}
    >
      <SimpleForm id="team-create-form" toolbar={<FormToolbar />}>
        <TeamForm isCreate />
      </SimpleForm>
    </Create>
  )
}
