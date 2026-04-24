import {
  List,
  Datagrid,
  TextField,
  DateField,
  SearchInput,
  TextInput,
  SelectField,
  FunctionField,
  EditButton,
  DeleteButton,
} from 'react-admin'

const MaterialFilters = [
  <SearchInput source="name" alwaysOn />,
  <TextInput source="description" label="Description" />,
  <TextInput source="warehouse_id" label="ID Entrepôt" />,
]

export default function MaterialList() {
  return (
    <List filters={MaterialFilters}>
      <Datagrid rowClick="show">
        <TextField source="id" />
        <TextField source="name" label="Nom" />
        <TextField source="description" label="Description" />
        <SelectField
          source="unit"
          label="unit"
          choices={[
            { id: 'SAC', name: 'Sac' },
            { id: 'L', name: 'Litre' },
            { id: 'KG', name: 'Kilogramme' },
            { id: 'M2', name: 'Mètre carré' },
            { id: 'M3', name: 'Mètre cube' },
            { id: 'KIT', name: 'Kit' },
            { id: 'POT', name: 'Pot' },
            { id: 'PNL', name: 'Panel' },
            { id: 'FEU', name: 'Feuille' },
            { id: 'BAR', name: 'Barre' },
            { id: 'T', name: 'Tonne' },
            { id: 'M', name: 'Mètre' },
            { id: 'FFT', name: 'Forfait' },
            { id: 'U', name: 'Unité' },
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
