export const supplier1Mock = {
  id: 'sup1_id',
  name: 'Fournitures BTP SARL',
  company_registration_number: '12345678901234',
  email: 'contact@fournitures-btp.fr',
  address: '12 Rue des Usines, 75001 Paris',
  phone: '01 23 45 67 89',
  contact_name: 'Jean Dupont',
  created_at: '2025-01-10T08:00:00Z',
  updated_at: '2025-03-15T10:00:00Z',
  created_by: { id: 'user1_id', first_name: 'Admin', last_name: 'User' },
  updated_by: { id: 'user1_id', first_name: 'Admin', last_name: 'User' },
}

export const supplier2Mock = {
  id: 'sup2_id',
  name: 'Matériaux Modernes SAS',
  company_registration_number: '98765432109876',
  email: 'commande@materiaux-modernes.fr',
  address: '5 Avenue des Travaux, 69001 Lyon',
  phone: '09 87 65 43 21',
  contact_name: 'Marie Martin',
  created_at: '2025-02-20T09:00:00Z',
  updated_at: '2025-04-10T14:00:00Z',
  created_by: { id: 'user1_id', first_name: 'Admin', last_name: 'User' },
  updated_by: { id: 'user1_id', first_name: 'Admin', last_name: 'User' },
}

export const suppliersMock = [supplier1Mock, supplier2Mock]

export const crupdateSuppliersMock = [
  {
    id: 'sup1_id',
    name: 'Fournitures BTP SARL - Mis à jour',
    company_registration_number: '12345678901234',
    email: 'update@fournitures-btp.fr',
    address: '12 Rue des Usines, 75001 Paris',
    phone: '01 23 45 67 89',
    contact_name: 'Jean Dupont',
  },
  {
    id: 'sup3_id',
    name: 'Nouveau fournisseur',
    company_registration_number: '11111111111111',
    email: 'new@supplier.fr',
    address: '1 Rue Neuve, 75002 Paris',
    phone: '01 11 11 11 11',
    contact_name: 'Pierre Durand',
  },
]

export const createOrUpdateSuppliers = (suppliers: any[]) =>
  suppliers.map((s: any) => ({
    ...s,
    id: s.id || 'newSupId',
    created_at: '2025-06-01T08:00:00Z',
    updated_at: '2025-06-01T08:00:00Z',
    created_by: { id: 'user1_id', first_name: 'Admin', last_name: 'User' },
    updated_by: { id: 'user1_id', first_name: 'Admin', last_name: 'User' },
  }))
