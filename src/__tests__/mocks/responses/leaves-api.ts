/* eslint-disable @typescript-eslint/no-explicit-any */
import { Leave, CrupdateLeave } from '../../../gen-ts/src'
import { user1Mock } from './users-api.ts'
import { leaveType1Mock, leaveType2Mock } from './leave-types-api.ts'
import { toCrupdateUserMapper, toAuditUserMapper } from '../../support/mappers.ts'

export const leave1Mock: Leave = {
  id: 'leave1_id',
  user: toCrupdateUserMapper(user1Mock),
  leave_type: leaveType1Mock,
  start_date: '2025-06-01' as any,
  end_date: '2025-06-15' as any,
  duration_days: 15,
  status: 'PENDING' as any,
  reason: "Vacances d'été",
  created_at: '2025-05-01T08:00:00Z' as any,
  updated_at: '2025-05-01T08:00:00Z' as any,
  created_by: toAuditUserMapper(user1Mock),
  updated_by: toAuditUserMapper(user1Mock),
}

export const leave2Mock: Leave = {
  id: 'leave2_id',
  user: toCrupdateUserMapper(user1Mock),
  leave_type: leaveType2Mock,
  start_date: '2025-07-10' as any,
  end_date: '2025-07-11' as any,
  duration_days: 2,
  status: 'APPROVED' as any,
  reason: 'Rendez-vous médical',
  approved_by: toCrupdateUserMapper(user1Mock),
  approved_at: '2025-06-01T10:00:00Z' as any,
  created_at: '2025-05-15T08:00:00Z' as any,
  updated_at: '2025-06-01T10:00:00Z' as any,
  created_by: toAuditUserMapper(user1Mock),
  updated_by: toAuditUserMapper(user1Mock),
}

export const leavesMock: Leave[] = [leave1Mock, leave2Mock]

export const crupdateLeavesMock: CrupdateLeave[] = [
  {
    id: 'leave_new_id',
    user_id: user1Mock?.id,
    leave_type_id: leaveType1Mock?.id,
    start_date: '2025-08-01' as any,
    end_date: '2025-08-15' as any,
    duration_days: 15,
    status: 'PENDING' as any,
    reason: 'Nouveau congé',
  },
]

export const createOrUpdateLeaves = (leaves: CrupdateLeave[]): Leave[] => {
  return leaves.map((l) => ({
    ...l,
    id: l.id || 'new_leave_id',
    user: toCrupdateUserMapper(user1Mock),
    leave_type: leaveType1Mock,
    created_at: new Date() as any,
    updated_at: new Date() as any,
    created_by: toAuditUserMapper(user1Mock),
    updated_by: toAuditUserMapper(user1Mock),
  }))
}
