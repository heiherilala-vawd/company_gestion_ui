import { Edit, SimpleForm, TextInput, SelectInput, ReferenceInput } from 'react-admin'

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
        <ReferenceInput source="expense_id" reference="expenses">
          <SelectInput optionText="description" />
        </ReferenceInput>
        <ReferenceInput source="employee_id" reference="users">
          <SelectInput optionText="email" />
        </ReferenceInput>
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
