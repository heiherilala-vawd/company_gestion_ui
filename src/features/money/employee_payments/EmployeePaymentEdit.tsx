import { Edit, SimpleForm, TextInput } from 'react-admin'
import EmployeePaymentForm from './EmployeePaymentForm.tsx'

export default function EmployeePaymentEdit() {
  return (
    <Edit
      redirect="list"
      queryOptions={{
        // Intercepter et modifier les données après le fetch
        select: (data) => ({
          ...data,
          // Ajouter des champs calculés
          employee_id: data.employee.id,
        }),
      }}
    >
      <SimpleForm>
        <TextInput source="id" sx={{ display: 'none' }} />
        <EmployeePaymentForm />
      </SimpleForm>
    </Edit>
  )
}
