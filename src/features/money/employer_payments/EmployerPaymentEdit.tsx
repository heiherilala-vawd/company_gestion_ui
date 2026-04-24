import { Edit, SimpleForm, TextInput, SelectInput } from 'react-admin'

export default function EmployerPaymentEdit() {
  return (
    <Edit
      transform={(data) => ({
        ...data,
        expense_id: data.expense?.id,
        expense: undefined,
        employee_id: data.employee?.id,
        employee: undefined,
      })}
    >
      <SimpleForm>
        <TextInput source="id" disabled />
        <TextInput source="expense.id" label="Dépense id" />
        <TextInput source="employee.id" label="Id de l'employé" />
        <TextInput source="payment_description" label="Description du paiement" multiline />
        <SelectInput
          source="payment_type"
          label="Type de paiement"
          choices={[
            { id: 'ADVANCE', name: 'Acompte' },
            { id: 'MONTHLY', name: 'Mensuel' },
            { id: 'OTHER', name: 'Autre' },
          ]}
        />
      </SimpleForm>
    </Edit>
  )
}
