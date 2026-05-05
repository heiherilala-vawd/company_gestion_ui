import {
  List,
  Datagrid,
  TextField,
  SelectField,
  SearchInput,
  TextInput,
  EditButton,
  DeleteButton,
  DateField,
  FunctionField,
} from 'react-admin'

const EmployerPaymentFilters = [
  <SearchInput source="payment_description" alwaysOn />,
  <TextInput source="employee_id" label="Employé" />,
]

export default function EmployeePaymentList() {
  return (
    <List resource="employee_payments" filters={EmployerPaymentFilters} perPage={25}>
      <Datagrid rowClick="show">
        <TextField source="expense.amount" label="Pris dépense" />
        <TextField source="expense.comment" label="Commentaire" />
        <TextField source="expense.job_id" label="Id travail" />
        <TextField source="employee.first_name" label="Nom persone" />
        <TextField source="employee.last_name" label="Prénomm persone" />
        <TextField source="payment_description" label="Description paiement" />

        <SelectField
          source="payment_type"
          label="Type"
          choices={[
            { id: 'ADVANCE', name: 'Acompte' },
            { id: 'MONTHLY', name: 'Mensuel' },
            { id: 'OTHER', name: 'Autre' },
          ]}
        />
        <DateField source="created_at" label="Créé le" showTime />
        <DateField source="updated_at" label="Modifié le" showTime />
        {/* Nom complet du créateur */}
        <FunctionField
          label="Créé par"
          render={(record) => (
            <span>
              {record.created_by?.first_name} {record.created_by?.last_name}
            </span>
          )}
        />

        {/* Nom complet du modificateur */}
        <FunctionField
          label="Modifié par"
          render={(record) => (
            <span>
              {record.updated_by?.first_name} {record.updated_by?.last_name}
            </span>
          )}
        />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  )
}
