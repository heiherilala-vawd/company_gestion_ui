import { EquipmentIncident, CrupdateEquipmentIncident, IncidentType } from '../../../gen-ts/src'
import { user1Mock } from './users-api.ts'
import { toAuditUserMapper } from '../../support/mappers.ts'

export const equipmentIncident1Mock: EquipmentIncident = {
  id: 'inc_001',
  incident_type: 'DAMAGED' as IncidentType,
  equipment_id: 'eq1_id',
  user_id: 'user2_id',
  travel_id: 'te1_id',
  location: 'wh1_id',
  comment: 'Equipment damaged during transport',
  created_at: '2024-03-01T10:00:00Z',
  updated_at: '2024-03-01T10:00:00Z',
  created_by: toAuditUserMapper(user1Mock),
  updated_by: toAuditUserMapper(user1Mock),
}

export const equipmentIncident2Mock: EquipmentIncident = {
  id: 'inc_002',
  incident_type: 'LOST' as IncidentType,
  equipment_id: 'eq2_id',
  user_id: 'user2_id',
  travel_id: 'te1_id',
  location: null,
  comment: 'Lost during transit',
  created_at: '2024-03-02T14:00:00Z',
  updated_at: '2024-03-02T14:00:00Z',
  created_by: toAuditUserMapper(user1Mock),
  updated_by: toAuditUserMapper(user1Mock),
}

export const equipmentIncidentsMock: EquipmentIncident[] = [
  equipmentIncident1Mock,
  equipmentIncident2Mock,
]

export const createOrUpdateEquipmentIncidents = (
  incidents: CrupdateEquipmentIncident[],
): EquipmentIncident[] => {
  return incidents.map((inc) => ({
    ...inc,
    created_at: '2024-03-01T10:00:00Z',
    updated_at: new Date().toISOString(),
    created_by: toAuditUserMapper(user1Mock),
    updated_by: toAuditUserMapper(user1Mock),
  }))
}
