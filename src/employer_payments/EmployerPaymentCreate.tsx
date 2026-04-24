import { Create, SimpleForm, TextInput, SelectInput, ReferenceInput } from 'react-admin'

export default function EmployerPaymentCreate() {
  return (
    <Create>
      <SimpleForm>
        <ReferenceInput source="expense_id" label="Dépense" reference="expenses">
          <SelectInput source="description" optionText="description" />
        </ReferenceInput>
        <ReferenceInput source="employee_id" label="Employé" reference="users">
          <SelectInput source="email" optionText="email" />
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
    </Create>
  )
}
