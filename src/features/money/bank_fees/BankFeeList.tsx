import {
  List,
  Datagrid,
  TextField,
  SearchInput,
  TextInput,
  EditButton,
  DeleteButton,
  DateField,
  FunctionField,
} from 'react-admin'

const BankFeeFilters = [
  <SearchInput source="bank_name" label="Banque" alwaysOn />,
  <TextInput source="description" label="Description" />,
]

export default function BankFeeList() {
  return (
    <List resource="bank_fees" filters={BankFeeFilters} perPage={25}>
      <Datagrid rowClick="show">
        <TextField source="expense.amount" label="Pris dépense" />
        <TextField source="expense.comment" label="Commentaire" />
        <TextField source="expense.job_id" label="Id travail" />
        <TextField source="bank_name" label="Banque" />
        <TextField source="description" label="Description" />
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
