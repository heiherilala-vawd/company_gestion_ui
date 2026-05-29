import { LeaveType, CrupdateLeaveType } from '../../../gen-ts/src'
import { user1Mock } from './users-api.ts'
import { toAuditUserMapper } from '../../support/mappers.ts'

export const leaveType1Mock: LeaveType = {
  id: 'lt1_id',
  name: 'Congé annuel',
  description: 'Congés payés annuels',
  paid: true,
  deduct_from_balance: true,
  color: '#4CAF50',
  days_per_year: 30,
  created_at: '2024-01-01T08:00:00Z' as any,
  updated_at: '2024-01-01T08:00:00Z' as any,
  created_by: toAuditUserMapper(user1Mock),
  updated_by: toAuditUserMapper(user1Mock),
}

export const leaveType2Mock: LeaveType = {
  id: 'lt2_id',
  name: 'Congé maladie',
  description: 'Congé pour raison médicale',
  paid: true,
  deduct_from_balance: false,
  color: '#F44336',
  days_per_year: 15,
  created_at: '2024-01-01T08:00:00Z' as any,
  updated_at: '2024-01-01T08:00:00Z' as any,
  created_by: toAuditUserMapper(user1Mock),
  updated_by: toAuditUserMapper(user1Mock),
}

export const leaveTypesMock: LeaveType[] = [leaveType1Mock, leaveType2Mock]

export const crupdateLeaveTypeMock: CrupdateLeaveType[] = [
  {
    id: 'lt_new_id',
    name: 'Nouveau type',
    description: 'Description',
    paid: true,
    deduct_from_balance: true,
    color: '#2196F3',
    days_per_year: 20,
  },
]
