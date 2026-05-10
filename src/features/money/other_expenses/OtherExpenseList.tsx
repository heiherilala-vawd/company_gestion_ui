import {
  List,
  TextField,
  SearchInput,
  EditButton,
  DeleteButton,
  DateField,
  FunctionField,
} from 'react-admin'
import { ResponsiveDatagrid } from '../../../generic/ResponsiveDatagrid'

const OtherExpenseFilters = [<SearchInput source="description" alwaysOn />]

export default function OtherExpenseList() {
  return (
    <List resource="other_expenses" filters={OtherExpenseFilters} perPage={25}>
      <ResponsiveDatagrid priorityFields={['expense.amount', 'description']}>
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
