import { Edit, SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import EmployeePaymentForm from './EmployeePaymentForm.tsx'

export default function EmployeePaymentEdit() {
  return (
    <Edit
      redirect="list"
      queryOptions={{
        select: (data) => ({
          ...data,
          employee_id: data.users?.[0]?.id,
          is_for_team: data.is_for_team || false,
        }),
      }}
    >
      <SimpleForm toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <EmployeePaymentForm />
      </SimpleForm>
    </Edit>
  )
}
