import { Edit, SimpleForm, TextInput } from 'react-admin'
import IncomeForm from './IncomeForm'

export default function IncomeEdit() {
  return (
    <Edit
      transform={(data) => ({
        ...data,
        job_id: data.job?.id,
        job: undefined,
      })}
    >
      <SimpleForm>
        <TextInput source="id" readOnly />
        <IncomeForm />
      </SimpleForm>
    </Edit>
  )
}
