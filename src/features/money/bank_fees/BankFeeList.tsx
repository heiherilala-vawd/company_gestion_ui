import {
  List,
  TextField,
  SearchInput,
  TextInput,
  EditButton,
  DeleteButton,
  DateField,
  FunctionField,
} from 'react-admin'
import { ResponsiveDatagrid } from '../../../generic/ResponsiveDatagrid'

const BankFeeFilters = [
  <SearchInput source="bank_name" alwaysOn />,
  <TextInput source="description" label="Description" />,
]

export default function BankFeeList() {
  return (
    <List resource="bank_fees" filters={BankFeeFilters} perPage={25}>
      <ResponsiveDatagrid priorityFields={['bank_name', 'expense.amount', 'description']}>
        <TextField source="bank_name" label="Banque" />
        <TextField source="expense.amount" label="Montant" />
        <TextField source="description" label="Description" />
        <TextField source="expense.comment" label="Commentaire" />
        <DateField source="created_at" label="Créé le" showTime />
        <DateField source="updated_at" label="Modifié le" showTime />
        <FunctionField
          label="Créé par"
          render={(record) => (
            <span>
              {record.created_by?.first_name} {record.created_by?.last_name}
            </span>
          )}
        />
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
      </ResponsiveDatagrid>
    </List>
  )
}
