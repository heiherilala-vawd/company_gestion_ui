import {
  List,
  Datagrid,
  TextField,
  DateField,
  SearchInput,
  TextInput,
  SelectInput,
  SelectField,
  BooleanInput,
  FunctionField,
  EditButton,
  DeleteButton,
} from 'react-admin'
import { MaterialUnit } from '../../../gen-ts/src/models/MaterialUnit'

const formatEnumLabel = (key: string) =>
  key
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ')

const MaterialFilters = [
  <SearchInput source="name" alwaysOn />,
  <TextInput source="description" label="Description" />,
  <SelectInput
    source="unit"
    label="Unité"
    choices={Object.entries(MaterialUnit).map(([k, v]) => ({ id: v, name: formatEnumLabel(k) }))}
  />,
  <BooleanInput source="not_arrived" label="Non arrivé" />,
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
