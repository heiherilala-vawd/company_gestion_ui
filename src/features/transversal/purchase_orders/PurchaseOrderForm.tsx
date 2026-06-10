import {
  TextInput,
  DateInput,
  NumberInput,
  SelectInput,
  ReferenceInput,
  ArrayInput,
  SimpleFormIterator,
} from 'react-admin'
import { Box } from '@mui/material'
import generateId from '../../../utili/utils.tsx'
import CollapsibleOptionalFields from '../../../generic/CollapsibleOptionalFields'

export default function PurchaseOrderForm({ isCreate = false, isCreateForm = false }) {
  const id = generateId()

  return (
    <>
      {isCreate && (
        <TextInput source="id" sx={{ display: 'none' }} defaultValue={id} data-testid="input-id" />
      )}
      {isCreateForm && <TextInput source="newId" readOnly defaultValue={id} />}
      <ReferenceInput source="supplier_id" reference="suppliers" label="Fournisseur">
        <SelectInput optionText="name" data-testid="input-supplier_id" />
      </ReferenceInput>
      <DateInput source="order_date" label="Date commande" data-testid="input-order_date" />
      <SelectInput
        source="status"
        label="Statut"
        choices={[
          { id: 'PENDING', name: 'En attente' },
          { id: 'VALIDATED', name: 'Validée' },
          { id: 'DELIVERED', name: 'Livrée' },
          { id: 'INVOICED', name: 'Facturée' },
        ]}
        defaultValue="PENDING"
        data-testid="input-status"
      />
      <NumberInput source="total_amount" label="Montant total" data-testid="input-total_amount" />
      <ReferenceInput source="job_id" reference="jobs" label="Travail">
        <SelectInput optionText="description" data-testid="input-job_id" />
      </ReferenceInput>
      <CollapsibleOptionalFields>
        <TextInput source="comment" label="Commentaire" multiline data-testid="input-comment" />
        <ArrayInput source="lines" label="Lignes de commande">
          <SimpleFormIterator inline>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
              <ReferenceInput source="material_id" reference="materials" label="Matériau">
                <SelectInput
                  optionText={(record: any) => `${record.name} / ${record.unit || ''}`}
                  data-testid="input-material_id"
                />
              </ReferenceInput>
              <NumberInput source="quantity" label="Quantité" data-testid="input-quantity" />
              <NumberInput
                source="unit_price"
                label="Prix unitaire"
                data-testid="input-unit_price"
              />
            </Box>
          </SimpleFormIterator>
        </ArrayInput>
      </CollapsibleOptionalFields>
    </>
  )
}
