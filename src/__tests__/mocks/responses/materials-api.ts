import { Material, CrupdateMaterial, MaterialUnit } from '../../../gen-ts/src'
import { user1Mock } from './users-api.ts'

export const material1Mock: Material = {
  id: 'mat1_id',
  name: 'Cement',
  description: 'Portland cement 50kg bags',
  unit: 'SAC' as MaterialUnit,
  comment: 'Standard construction cement',
  created_at: '2022-01-10T08:00:00Z',
  updated_at: '2022-06-15T10:00:00Z',
  created_by: {
    id: user1Mock.id,
    role: user1Mock.role,
    first_name: user1Mock.first_name,
    last_name: user1Mock.last_name,
    sex: user1Mock.sex,
    email: user1Mock.email,
  },
  updated_by: {
    id: user1Mock.id,
    role: user1Mock.role,
    first_name: user1Mock.first_name,
    last_name: user1Mock.last_name,
    sex: user1Mock.sex,
    email: user1Mock.email,
  },
}

export const material2Mock: Material = {
  id: 'mat2_id',
  name: 'Steel Rebar',
  description: '12mm steel reinforcement bars',
  unit: 'BAR' as MaterialUnit,
  comment: 'Structural reinforcement',
  created_at: '2022-01-15T09:00:00Z',
  updated_at: '2022-05-20T14:00:00Z',
  created_by: {
    id: user1Mock.id,
    role: user1Mock.role,
    first_name: user1Mock.first_name,
    last_name: user1Mock.last_name,
    sex: user1Mock.sex,
    email: user1Mock.email,
  },
  updated_by: {
    id: user1Mock.id,
    role: user1Mock.role,
    first_name: user1Mock.first_name,
    last_name: user1Mock.last_name,
    sex: user1Mock.sex,
    email: user1Mock.email,
  },
}

export const material3Mock: Material = {
  id: 'mat3_id',
  name: 'Paint',
  description: 'White acrylic paint',
  unit: 'L' as MaterialUnit,
  comment: 'Interior paint',
  created_at: '2022-02-01T10:00:00Z',
  updated_at: '2022-04-10T11:00:00Z',
  created_by: {
    id: user1Mock.id,
    role: user1Mock.role,
    first_name: user1Mock.first_name,
    last_name: user1Mock.last_name,
    sex: user1Mock.sex,
    email: user1Mock.email,
  },
  updated_by: {
    id: user1Mock.id,
    role: user1Mock.role,
    first_name: user1Mock.first_name,
    last_name: user1Mock.last_name,
    sex: user1Mock.sex,
    email: user1Mock.email,
  },
}

export const materialsMock: Material[] = [material1Mock, material2Mock, material3Mock]

export const crupdateMaterialsMock: CrupdateMaterial[] = [
  {
    id: 'mat1_id',
    name: 'Cement Updated',
    description: 'Portland cement 25kg bags',
    unit: 'SAC' as MaterialUnit,
    comment: 'Updated packaging',
  },
  {
    id: 'mat4_id',
    name: 'Gravel',
    description: 'Construction gravel',
    unit: 'T' as MaterialUnit,
    comment: 'New material',
  },
]
