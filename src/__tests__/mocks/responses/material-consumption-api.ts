import { material1Mock, material2Mock } from './materials-api.ts'
import { toCrupdateMaterialMapper } from '../../support/mappers.ts'

export const materialConsumption1Mock = {
  id: 'mc1_id',
  material_id: 'mat1_id',
  material: toCrupdateMaterialMapper(material1Mock),
  warehouse_id: 'wh1_id',
  quantity: 50,
  consumption_date: new Date('2024-06-01'),
  job_id: 'job1_id',
  reason: 'Utilisation pour fondations travail A',
  consumption_status: 'IN_PROGRESS',
}

export const materialConsumption2Mock = {
  id: 'mc2_id',
  material_id: 'mat2_id',
  material: toCrupdateMaterialMapper(material2Mock),
  warehouse_id: 'wh2_id',
  quantity: 100,
  consumption_date: new Date('2024-06-05'),
  job_id: 'job1_id',
  reason: 'Utilisation pour murs travail A',
  consumption_status: 'IN_PROGRESS',
}

export const materialConsumptionsMock = [materialConsumption1Mock, materialConsumption2Mock]

export const crupdateMaterialConsumptionsMock = [
  {
    id: 'mc1_id',
    material_id: 'mat1_id',
    warehouse_id: 'wh1_id',
    quantity: 60,
    consumption_date: new Date('2024-06-02'),
    job_id: 'job1_id',
    reason: 'Utilisation pour fondations - mis à jour',
  },
  {
    id: 'mc3_id',
    material_id: 'mat1_id',
    warehouse_id: 'wh1_id',
    quantity: 30,
    consumption_date: new Date('2024-06-10'),
    job_id: 'job1_id',
    reason: 'Nouvelle consommation',
  },
]

export const createOrUpdateMaterialConsumptions = (consumptions: any[]) =>
  consumptions.map((c: any) => ({ ...c, id: c.id || 'newId' }))

export const returnMaterialConsumptionMock = (consumptionId: string, quantity: number) => ({
  ...materialConsumption1Mock,
  id: consumptionId,
  quantity: (materialConsumption1Mock.quantity || 0) - quantity,
})

export const completeMaterialConsumptionMock = (consumptionId: string) => ({
  ...materialConsumption1Mock,
  id: consumptionId,
  consumption_status: 'COMPLETED',
})
