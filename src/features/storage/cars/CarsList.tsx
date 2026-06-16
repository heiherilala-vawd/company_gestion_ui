import {
  List,
  SearchInput,
  TextInput,
  SelectInput,
  EditButton,
  FunctionField,
  NumberField,
  ReferenceInput,
} from 'react-admin'
import { ResponsiveDatagrid } from '../../../generic/ResponsiveDatagrid'

const STATUT_CHOICES = [
  { id: 'DISPONIBLE', name: 'Disponible' },
  { id: 'EN_MISSION', name: 'En mission' },
  { id: 'EN_PANNE', name: 'En panne' },
  { id: 'REFORME', name: 'Réformé' },
]

const TYPE_CARBURANT_CHOICES = [
  { id: 'DIESEL', name: 'Diesel' },
  { id: 'ESSENCE', name: 'Essence' },
  { id: 'ELECTRIQUE', name: 'Électrique' },
  { id: 'HYBRIDE', name: 'Hybride' },
]

const CarsFilters = [
  <SearchInput source="q" alwaysOn key="q" />,
  <TextInput source="immatriculation" label="Immatriculation" key="immatriculation" />,
  <TextInput source="marque" label="Marque" key="marque" />,
  <SelectInput source="statut" label="Statut" choices={STATUT_CHOICES} key="statut" />,
  <ReferenceInput source="warehouse_id" reference="warehouses" perPage={100} key="warehouse_id">
    <SelectInput optionText="name" label="Entrepôt" />
  </ReferenceInput>,
  <ReferenceInput source="equipment_id" reference="equipment" perPage={100} key="equipment_id">
    <SelectInput optionText="name" label="Équipement" />
  </ReferenceInput>,
]

export default function CarsList() {
  return (
    <List resource="cars" filters={CarsFilters} perPage={25}>
      <ResponsiveDatagrid priorityFields={['immatriculation', 'marque', 'modele', 'statut']}>
        <FunctionField label="Immatriculation" render={(record) => record.immatriculation || ''} />
        <FunctionField label="Marque" render={(record) => record.marque || ''} />
        <FunctionField label="Modèle" render={(record) => record.modele || ''} />
        <FunctionField
          source="type_carburant"
          label="Carburant"
          render={(record) =>
            TYPE_CARBURANT_CHOICES.find((c) => c.id === record.type_carburant)?.name ||
            record.type_carburant ||
            ''
          }
        />
        <FunctionField
          source="statut"
          label="Statut"
          render={(record) =>
            STATUT_CHOICES.find((c) => c.id === record.statut)?.name || record.statut || ''
          }
        />
        <NumberField source="kilometrage" label="Km" />
        <FunctionField
          source="equipment"
          label="Équipement"
          render={(record) => record.equipment?.name || ''}
        />
        <FunctionField
          source="warehouse"
          label="Entrepôt"
          render={(record) => record.warehouse?.name || ''}
        />
        <EditButton />
      </ResponsiveDatagrid>
    </List>
  )
}
