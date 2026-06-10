import {
  List,
  SearchInput,
  EditButton,
  NumberField,
  DateField,
  SelectField,
  SelectInput,
  ReferenceInput,
  FunctionField,
} from 'react-admin'
import { ResponsiveDatagrid } from '../../../generic/ResponsiveDatagrid'

const MaterialConsumptionFilters = [
  <SearchInput source="q" alwaysOn key="search" />,
  <ReferenceInput source="material_id" reference="materials" perPage={100} key="material_id">
    <SelectInput
      optionText={(record: any) => `${record.name} / ${record.unit || ''}`}
      label="Matériau"
    />
  </ReferenceInput>,
  <ReferenceInput source="warehouse_id" reference="warehouses" perPage={100} key="warehouse_id">
    <SelectInput optionText="name" label="Entrepôt" />
  </ReferenceInput>,
  <SelectInput
    source="consumption_status"
    label="Statut"
    choices={[
      { id: 'COMPLETED', name: 'Terminé' },
      { id: 'IN_PROGRESS', name: 'En cours' },
      { id: 'CANCELLED', name: 'Annulé' },
    ]}
    alwaysOn
    key="consumption_status"
  />,
  <ReferenceInput source="job_id" reference="jobs" perPage={100} key="job_id">
    <SelectInput optionText="description" label="Travail" />
  </ReferenceInput>,
]

export default function MaterialConsumptionList() {
  return (
    <List resource="material_consumption" filters={MaterialConsumptionFilters} perPage={25}>
      <ResponsiveDatagrid
        priorityFields={[
          'material_id',
          'warehouse_id',
          'quantity',
          'consumption_status',
          'consumption_date',
        ]}
      >
        <FunctionField
          source="material_id"
          label="Matériau"
          render={(record) => record.material?.name || record.material_id || ''}
        />
        <FunctionField
          source="warehouse_id"
          label="Entrepôt"
          render={(record) => record.warehouse?.name || record.warehouse_id || ''}
        />
        <NumberField source="quantity" label="Quantité" />
        <SelectField
          source="consumption_status"
          label="Statut"
          choices={[
            { id: 'COMPLETED', name: 'Terminé' },
            { id: 'IN_PROGRESS', name: 'En cours' },
            { id: 'CANCELLED', name: 'Annulé' },
          ]}
        />
        <DateField source="consumption_date" label="Date consommation" />
        <FunctionField
          source="job_id"
          label="Travail"
          render={(record) => record.job?.description || record.job_id || ''}
        />
        <EditButton />
      </ResponsiveDatagrid>
    </List>
  )
}
