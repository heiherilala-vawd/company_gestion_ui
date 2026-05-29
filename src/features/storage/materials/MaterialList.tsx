import {
  List,
  TextField,
  SearchInput,
  TextInput,
  SelectInput,
  SelectField,
  BooleanInput,
  EditButton,
} from 'react-admin'
import { MaterialUnit } from '../../../gen-ts/src/models/MaterialUnit'
import { ResponsiveDatagrid } from '../../../generic/ResponsiveDatagrid'

const formatEnumLabel = (key: string) =>
  key
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ')

const MaterialFilters = [
  <SearchInput source="q" alwaysOn key="q" />,
  <TextInput source="description" label="Description" key="description" />,
  <SelectInput
    source="unit"
    label="Unité"
    key="unit"
    choices={Object.entries(MaterialUnit).map(([k, v]) => ({ id: v, name: formatEnumLabel(k) }))}
  />,
  <BooleanInput source="not_arrived" label="Non arrivé" key="not_arrived" />,
]

export default function MaterialList() {
  return (
    <List filters={MaterialFilters}>
      <ResponsiveDatagrid priorityFields={['name', 'description', 'unit']}>
        <TextField source="name" label="Nom" />
        <TextField source="description" label="Description" />
        <SelectField
          source="unit"
          label="Unité"
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
        <EditButton />
      </ResponsiveDatagrid>
    </List>
  )
}
