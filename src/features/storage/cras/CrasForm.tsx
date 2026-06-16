import { required, TextInput, NumberInput, SelectInput, BooleanInput, DateInput } from 'react-admin'
import generateId from '../../../utili/utils.tsx'
import { renderJobSelect } from '../../../generic/SelectWithCreateProvider.tsx'
import CollapsibleOptionalFields from '../../../generic/CollapsibleOptionalFields'

const TYPE_CARBURANT_CHOICES = [
  { id: 'DIESEL', name: 'Diesel' },
  { id: 'ESSENCE', name: 'Essence' },
  { id: 'ELECTRIQUE', name: 'Électrique' },
  { id: 'HYBRIDE', name: 'Hybride' },
]

const STATUT_CHOICES = [
  { id: 'DISPONIBLE', name: 'Disponible' },
  { id: 'EN_MISSION', name: 'En mission' },
  { id: 'EN_PANNE', name: 'En panne' },
  { id: 'REFORME', name: 'Réformé' },
]

export default function CrasForm({ isCreate = false, isCreateForm = false }) {
  return (
    <>
      {isCreate && (
        <TextInput
          source="id"
          sx={{ display: 'none' }}
          defaultValue={generateId()}
          data-testid="input-id"
        />
      )}
      {isCreateForm && (
        <TextInput source="newId" sx={{ display: 'none' }} defaultValue={generateId()} />
      )}
      <TextInput
        source="equipment_id"
        sx={{ display: 'none' }}
        defaultValue={generateId()}
        data-testid="input-equipment_id"
      />
      <TextInput
        source="immatriculation"
        label="Immatriculation"
        validate={[required()]}
        data-testid="input-immatriculation"
      />
      <SelectInput
        source="type_carburant"
        label="Type de carburant"
        choices={TYPE_CARBURANT_CHOICES}
        validate={[required()]}
        data-testid="input-type_carburant"
      />
      <TextInput
        source="equipment_name"
        label="Nom équipement"
        data-testid="input-equipment_name"
      />
      <TextInput
        source="warehouse_id"
        sx={{ display: 'none' }}
        defaultValue={generateId()}
        data-testid="input-warehouse_id"
      />
      <NumberInput
        source="purchase_price"
        label="Prix d'achat"
        data-testid="input-purchase_price"
      />
      <DateInput source="purchase_date" label="Date d'achat" data-testid="input-purchase_date" />
      <CollapsibleOptionalFields>
        <TextInput
          source="equipment_category"
          label="Catégorie équipement"
          defaultValue="Véhicule"
          data-testid="input-equipment_category"
        />
        <BooleanInput
          source="est_en_panne"
          label="Hors d'usage"
          defaultValue={false}
          data-testid="input-est_en_panne"
        />
        <TextInput
          source="warehouse_description"
          label="Description entrepôt"
          multiline
          rows={3}
          data-testid="input-warehouse_description"
        />
        {renderJobSelect('job_id', 'Travail')}
        <TextInput source="marque" label="Marque" data-testid="input-marque" />
        <TextInput source="modele" label="Modèle" data-testid="input-modele" />
        <NumberInput source="annee" label="Année" data-testid="input-annee" />
        <TextInput source="couleur" label="Couleur" data-testid="input-couleur" />
        <NumberInput source="kilometrage" label="Kilométrage" data-testid="input-kilometrage" />
        <SelectInput
          source="statut"
          label="Statut"
          choices={STATUT_CHOICES}
          defaultValue="DISPONIBLE"
          data-testid="input-statut"
        />
      </CollapsibleOptionalFields>
    </>
  )
}
