import { Create, SimpleForm, TextInput } from 'react-admin'
import ReferenceSelectWithCreate from '../../../generic/ReferenceSelectWithCreate'

export default function BankFeeCreate() {
  return (
    <Create>
      <SimpleForm>
        <ReferenceSelectWithCreate
          source="expense_id"
          reference="expenses"
          label="Dépense"
          optionText="description"
          fields={[
            { source: 'job_id', label: 'Chantier', type: 'select', required: true },
            { source: 'amount', label: 'Montant', type: 'number', required: true },
            {
              source: 'description',
              label: 'Description',
              type: 'textarea',
              multiline: true,
              rows: 3,
            },
            { source: 'comment', label: 'Commentaire', type: 'textarea', multiline: true, rows: 3 },
          ]}
        />
        <TextInput source="bank_name" label="Nom de la banque" />
        <TextInput source="description" label="Description" multiline />
      </SimpleForm>
    </Create>
  )
}
