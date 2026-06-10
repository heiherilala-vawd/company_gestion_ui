import { SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import EmployeePaymentForm from './EmployeePaymentForm.tsx'
import GenericEdit from '../../../generic/GenericEdit'

export default function EmployeePaymentEdit() {
  return (
    <GenericEdit
      transform={(data) => {
        if (!data.expense?.description && data.expense?._generated_desc) {
          data.expense.description = data.expense._generated_desc
        }
        delete data.expense?._generated_desc
        return data
      }}
      queryOptions={{
        select: (data) => ({
          ...data,
          user_ids: data.users?.map((u: any) => u.id) || [],
          team_id: data.team?.id,
          is_for_team: data.is_for_team || false,
        }),
      }}
    >
      <SimpleForm id="employee-payment-edit-form" toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <EmployeePaymentForm />
      </SimpleForm>
    </GenericEdit>
  )
}
