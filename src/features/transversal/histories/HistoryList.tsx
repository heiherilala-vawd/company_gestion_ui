import {
  List,
  DateField,
  TextField,
  TextInput,
  SearchInput,
  ShowButton,
  SelectField,
  SelectInput,
  ReferenceInput,
  DateInput,
  FunctionField,
} from 'react-admin'
import { ResponsiveDatagrid } from '../../../generic/ResponsiveDatagrid'

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

const HistoryFilters = [
  <SearchInput source="q" alwaysOn key="search" />,
  <ReferenceInput source="user_id" reference="users" key="user_id" perPage={100}>
    <SelectInput
      label="Utilisateur"
      optionText={(record) => `${record.first_name} ${record.last_name}`}
    />
  </ReferenceInput>,
  <SelectInput source="entity_type" label="Entité" choices={entityTypeChoices} key="entity_type" />,
  <TextInput source="entity_id" label="ID Entité" key="entity_id" />,
  <DateInput source="date_from" label="Date début" key="date_from" />,
  <DateInput source="date_to" label="Date fin" key="date_to" />,
]

export default function HistoryList() {
  return (
    <List resource="histories" filters={HistoryFilters} perPage={25}>
      <ResponsiveDatagrid priorityFields={['entity_type', 'modified_at']}>
        <SelectField source="entity_type" label="Entité" choices={entityTypeChoices} />
        <TextField source="entity_id" label="ID Entité" />
        <FunctionField
          source="user_id"
          label="Utilisateur"
          render={(record) =>
            record.user ? `${record.user.first_name} ${record.user.last_name}` : ''
          }
        />
        <DateField source="modified_at" label="Date" showTime />
        <ShowButton />
      </ResponsiveDatagrid>
    </List>
  )
}
