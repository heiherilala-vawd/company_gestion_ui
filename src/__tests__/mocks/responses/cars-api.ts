import { user1Mock } from './users-api.ts'
import { warehouse1Mock } from './warehouses-api.ts'
import { toAuditUserMapper } from '../../support/mappers.ts'

export interface Cars {
  id: string
  immatriculation: string
  type_carburant: string
  marque?: string
  modele?: string
  annee?: number
  couleur?: string
  kilometrage?: number
  statut?: string
  equipment?: {
    id: string
    name: string
    category: string
    purchase_price?: number
    purchase_date?: string
    est_en_panne?: boolean
  }
  warehouse?: { id: string; name: string; description?: string; job_id?: string }
  created_at: string
  updated_at: string
  created_by: ReturnType<typeof toAuditUserMapper>
  updated_by: ReturnType<typeof toAuditUserMapper>
}

export interface CrupdateCars {
  id: string
  immatriculation: string
  type_carburant: string
  equipment_id?: string
  warehouse_id?: string
  equipment_name?: string
  purchase_price?: number
  purchase_date?: string
  equipment_category?: string
  est_en_panne?: boolean
  warehouse_description?: string
  job_id?: string
  marque?: string
  modele?: string
  annee?: number
  couleur?: string
  kilometrage?: number
  statut?: string
}

export const cars1Mock: Cars = {
  id: 'cars1_id',
  immatriculation: 'AB-123-CD',
  type_carburant: 'DIESEL',
  marque: 'Renault',
  modele: 'Master',
  annee: 2022,
  couleur: 'Blanc',
  kilometrage: 45000,
  statut: 'DISPONIBLE',
  equipment: {
    id: 'eq1_id',
    name: 'Renault Master',
    category: 'Véhicule',
    purchase_price: 35000,
    purchase_date: '2022-01-15',
    est_en_panne: false,
  },
  warehouse: {
    id: warehouse1Mock.id,
    name: warehouse1Mock.name,
    description: warehouse1Mock.description,
    job_id: warehouse1Mock.job?.id,
  },
  created_at: '2022-02-01T08:00:00Z',
  updated_at: '2022-05-15T10:00:00Z',
  created_by: toAuditUserMapper(user1Mock),
  updated_by: toAuditUserMapper(user1Mock),
}

export const cars2Mock: Cars = {
  id: 'cars2_id',
  immatriculation: 'EF-456-GH',
  type_carburant: 'ESSENCE',
  marque: 'Peugeot',
  modele: 'Partner',
  annee: 2023,
  couleur: 'Gris',
  kilometrage: 12000,
  statut: 'EN_MISSION',
  equipment: {
    id: 'eq2_id',
    name: 'Peugeot Partner',
    category: 'Véhicule',
    purchase_price: 22000,
    purchase_date: '2023-03-20',
    est_en_panne: false,
  },
  warehouse: {
    id: warehouse1Mock.id,
    name: warehouse1Mock.name,
    description: warehouse1Mock.description,
    job_id: warehouse1Mock.job?.id,
  },
  created_at: '2023-04-01T09:00:00Z',
  updated_at: '2023-06-10T14:00:00Z',
  created_by: toAuditUserMapper(user1Mock),
  updated_by: toAuditUserMapper(user1Mock),
}

export const carsMock: Cars[] = [cars1Mock, cars2Mock]

export const crupdateCarsMock: CrupdateCars[] = [
  {
    id: 'cars1_id',
    immatriculation: 'AB-123-CD-Updated',
    type_carburant: 'DIESEL',
    equipment_id: 'eq1_id',
    warehouse_id: warehouse1Mock.id,
    equipment_name: 'Renault Master Updated',
    marque: 'Renault',
    modele: 'Master',
    annee: 2022,
    couleur: 'Bleu',
    kilometrage: 50000,
    statut: 'DISPONIBLE',
  },
  {
    id: 'cars3_id',
    immatriculation: 'GH-789-IJ',
    type_carburant: 'HYBRIDE',
    equipment_id: 'eq3_id',
    warehouse_id: warehouse1Mock.id,
    equipment_name: 'Toyota Proace',
    marque: 'Toyota',
    modele: 'Proace',
    annee: 2024,
    couleur: 'Noir',
    kilometrage: 5000,
    statut: 'DISPONIBLE',
  },
]

export const createOrUpdateCars = (carsData: CrupdateCars[]): Cars[] => {
  return carsData.map((c) => ({
    ...c,
    id: 'newId',
    equipment: {
      id: c.equipment_id || 'eq1_id',
      name: c.equipment_name || 'Véhicule',
      category: c.equipment_category || 'Véhicule',
      purchase_price: c.purchase_price,
      purchase_date: c.purchase_date,
      est_en_panne: c.est_en_panne || false,
    },
    warehouse: {
      id: c.warehouse_id || warehouse1Mock.id,
      name: warehouse1Mock.name,
      description: c.warehouse_description || warehouse1Mock.description,
      job_id: c.job_id || warehouse1Mock.job?.id,
    },
    created_at: c.id ? cars1Mock.created_at : new Date().toISOString(),
    updated_at: new Date().toISOString(),
    created_by: toAuditUserMapper(user1Mock),
    updated_by: toAuditUserMapper(user1Mock),
  }))
}
