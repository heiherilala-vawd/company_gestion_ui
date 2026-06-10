import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  DateField,
  FunctionField,
} from 'react-admin'

const STATUT_CHOICES: Record<string, string> = {
  DISPONIBLE: 'Disponible',
  EN_MISSION: 'En mission',
  EN_PANNE: 'En panne',
  REFORME: 'Réformé',
}

const TYPE_CARBURANT_CHOICES: Record<string, string> = {
  DIESEL: 'Diesel',
  ESSENCE: 'Essence',
  ELECTRIQUE: 'Électrique',
  HYBRIDE: 'Hybride',
}

export default function VoitureShow() {
  return (
    <Show title="Détails voiture">
      <SimpleShowLayout>
        <TextField source="immatriculation" label="Immatriculation" />
        <FunctionField
          label="Type de carburant"
          render={(record) =>
            TYPE_CARBURANT_CHOICES[record.type_carburant] || record.type_carburant
          }
        />
        <FunctionField
          label="Statut"
          render={(record) => STATUT_CHOICES[record.statut] || record.statut}
        />
        <TextField source="marque" label="Marque" />
        <TextField source="modele" label="Modèle" />
        <NumberField source="annee" label="Année" />
        <TextField source="couleur" label="Couleur" />
        <NumberField source="kilometrage" label="Kilométrage" />
        <FunctionField label="Équipement" render={(record) => record.equipment?.name || ''} />
        <FunctionField
          label="Catégorie équipement"
          render={(record) => record.equipment?.category || ''}
        />
        <FunctionField label="Entrepôt" render={(record) => record.warehouse?.name || ''} />
        <FunctionField
          label="Description entrepôt"
          render={(record) => record.warehouse?.description || ''}
        />
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
      </SimpleShowLayout>
    </Show>
  )
}
