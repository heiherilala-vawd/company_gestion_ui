import {
  List,
  TextField,
  SelectField,
  SearchInput,
  SelectInput,
  ReferenceInput,
  EditButton,
  FunctionField,
  BooleanField,
} from 'react-admin'
import { PaymentType } from '../../../gen-ts/src/models/PaymentType'
import { ResponsiveDatagrid } from '../../../generic/ResponsiveDatagrid'

const EmployerPaymentFilters = [
  <SearchInput source="q" alwaysOn key="q" />,
  <ReferenceInput source="employee_id" reference="users" perPage={100} key="employee_id">
    <SelectInput optionText={(r: any) => `${r.first_name} ${r.last_name}`} label="Employé" />
  </ReferenceInput>,
  <SelectInput
    source="payment_type"
    label="Type de paiement"
    key="payment_type"
    choices={Object.entries(PaymentType).map(([k, v]) => ({ id: v, name: k }))}
  />,
]

export default function EmployeePaymentList() {
  return (
    <List resource="employee_payments" filters={EmployerPaymentFilters} perPage={25}>
      <ResponsiveDatagrid priorityFields={['expense.amount', 'users.0.first_name', 'payment_type']}>
        <TextField source="expense.amount" label="Montant" />
        <FunctionField
          label="Employés"
          render={(record: any) =>
            record.users?.map((u: any) => `${u.first_name} ${u.last_name}`).join(', ') || ''
          }
        />
        <BooleanField source="is_for_team" label="Équipe" />
        <SelectField
          source="payment_type"
          label="Type"
          choices={[
            { id: 'ADVANCE', name: 'Acompte' },
            { id: 'MONTHLY', name: 'Mensuel' },
            { id: 'OTHER', name: 'Autre' },
          ]}
        />
        <TextField source="payment_description" label="Description" />
        <TextField source="expense.comment" label="Commentaire" />
        <EditButton />
      </ResponsiveDatagrid>
    </List>
  )
}
