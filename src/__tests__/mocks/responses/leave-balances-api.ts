import { LeaveBalance } from '../../../gen-ts/src'
import { user1Mock, user2Mock } from './users-api.ts'
import { toCrupdateUserMapper } from '../../support/mappers.ts'

export const leaveBalance1Mock: LeaveBalance = {
  user: toCrupdateUserMapper(user1Mock),
  year: 2025,
  accrued_days: 30,
  taken_days: 10,
  remaining_days: 20,
}

export const leaveBalance2Mock: LeaveBalance = {
  user: toCrupdateUserMapper(user2Mock),
  year: 2025,
  accrued_days: 25,
  taken_days: 15,
  remaining_days: 10,
}

export const leaveBalancesMock: LeaveBalance[] = [leaveBalance1Mock, leaveBalance2Mock]
