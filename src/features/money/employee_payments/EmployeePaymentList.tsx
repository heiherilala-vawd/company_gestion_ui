import {
  List,
  TextField,
  SelectField,
  SearchInput,
  SelectInput,
  ReferenceInput,
  EditButton,
  DeleteButton,
  DateField,
  FunctionField,
} from 'react-admin'
import { PaymentType } from '../../../gen-ts/src/models/PaymentType'
import { ResponsiveDatagrid } from '../../../generic/ResponsiveDatagrid'

const EmployerPaymentFilters = [
  <SearchInput source="payment_description" alwaysOn />,
  <ReferenceInput source="employee_id" reference="users" perPage={100}>
    <SelectInput optionText={(r: any) => `${r.first_name} ${r.last_name}`} label="Employé" />
  </ReferenceInput>,
  <SelectInput
    source="payment_type"
    label="Type de paiement"
    choices={Object.entries(PaymentType).map(([k, v]) => ({ id: v, name: k }))}
  />,
]

export default function EmployeePaymentList() {
  return (
    <List resource="employee_payments" filters={EmployerPaymentFilters} perPage={25}>
      <ResponsiveDatagrid
        priorityFields={[
          'expense.amount',
          'payment_type',
          'employee.first_name',
          'employee.last_name',
        ]}
      >
        <TextField source="expense.amount" label="Montant" />
        <SelectField
          source="payment_type"
          label="Type"
          choices={[
            { id: 'ADVANCE', name: 'Acompte' },
            { id: 'MONTHLY', name: 'Mensuel' },
            { id: 'OTHER', name: 'Autre' },
          ]}
        />
        <TextField source="employee.first_name" label="Prénom" />
        <TextField source="employee.last_name" label="Nom" />
        <TextField source="payment_description" label="Description" />
        <TextField source="expense.comment" label="Commentaire" />
        <EditButton />
      </ResponsiveDatagrid>
    </List>
  )
}
