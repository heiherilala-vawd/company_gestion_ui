import { SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import LoanForm from './LoanForm'
import GenericEdit from '../../../generic/GenericEdit'

export default function LoanEdit() {
  return (
    <GenericEdit
      queryOptions={{
        select: (data) => ({
          ...data,
          job_id: data.job?.id,
        }),
      }}
    >
      <SimpleForm id="loan-edit-form" toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <LoanForm />
      </SimpleForm>
    </GenericEdit>
  )
}
