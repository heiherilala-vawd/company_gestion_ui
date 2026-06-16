import {
  DateField,
  FunctionField,
  Show,
  SimpleShowLayout,
  TextField,
  SelectField,
} from 'react-admin'

const entityTypeChoices = [
  { id: 'USER', name: 'Utilisateur' },
  { id: 'COMPANY', name: 'Entreprise' },
  { id: 'JOB', name: 'Travail' },
  { id: 'WAREHOUSE', name: 'Entrepôt' },
  { id: 'EQUIPMENT', name: 'Équipement' },
  { id: 'MATERIAL', name: 'Matériau' },
  { id: 'INCOMEMONEY', name: 'Revenu' },
  { id: 'INCOMETYPE', name: 'Type de revenu' },
  { id: 'EXPENSEMONEY', name: 'Dépense' },
  { id: 'EMPLOYEE_PAYMENT', name: 'Paiement employé' },
  { id: 'TRAVEL_EXPENSE', name: 'Frais de déplacement' },
  { id: 'TRAVELPEOPLE', name: 'Personne déplacement' },
  { id: 'TRAVELMATERIALS', name: 'Matériel déplacement' },
  { id: 'TRAVELEQUIPMENT', name: 'Équipement déplacement' },
  { id: 'PURCHASE', name: 'Achat' },
  { id: 'BANK_FEE', name: 'Frais bancaire' },
  { id: 'OTHER_EXPENSE', name: 'Autre dépense' },
  { id: 'TEAM', name: 'Équipe' },
  { id: 'OTHEREXPENSETYPE', name: "Type d'autre dépense" },
  { id: 'COMPANYFIXEDCOST', name: 'Coût fixe' },
  { id: 'LOAN', name: 'Prêt' },
  { id: 'LOANREPAYMENT', name: 'Remboursement prêt' },
  { id: 'INCOMERECEIPT', name: 'Reçu' },
  { id: 'LEAVETYPE', name: 'Type de congé' },
  { id: 'EMPLOYEELEAVECONFIG', name: 'Config congé' },
  { id: 'LEAVE', name: 'Congé' },
  { id: 'TASK', name: 'Tâche' },
  { id: 'TASKASSIGNMENT', name: 'Assignation tâche' },
  { id: 'TASKSCHEDULE', name: 'Planification tâche' },
  { id: 'DEPARTMENT', name: 'Département' },
  { id: 'CASHACCOUNT', name: 'Compte caisse' },
  { id: 'CASHTRANSACTION', name: 'Transaction caisse' },
  { id: 'BUDGETLINE', name: 'Ligne budgétaire' },
  { id: 'EQUIPMENTUSAGE', name: 'Usage équipement' },
  { id: 'MATERIALCONSUMPTION', name: 'Consommation matériau' },
]

export default function HistoryShow() {
  return (
    <Show title="Détails historique">
      <SimpleShowLayout>
        <TextField source="id" />
        <SelectField source="entity_type" label="Entité" choices={entityTypeChoices} />
        <TextField source="entity_id" label="ID Entité" />
        <FunctionField
          label="Utilisateur"
          render={(record) => (
            <span>
              {record.user?.first_name} {record.user?.last_name}
            </span>
          )}
        />
        <DateField source="modified_at" label="Date de modification" showTime />
        <FunctionField
          label="Ancienne valeur"
          render={(record) => (
            <pre style={{ whiteSpace: 'pre-wrap', maxHeight: 200, overflow: 'auto' }}>
              {record.previous_value
                ? JSON.stringify(JSON.parse(record.previous_value), null, 2)
                : ''}
            </pre>
          )}
        />
        <FunctionField
          label="Nouvelle valeur"
          render={(record) => (
            <pre style={{ whiteSpace: 'pre-wrap', maxHeight: 200, overflow: 'auto' }}>
              {record.new_value ? JSON.stringify(JSON.parse(record.new_value), null, 2) : ''}
            </pre>
          )}
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
