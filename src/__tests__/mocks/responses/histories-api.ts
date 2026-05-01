import { History, EntityType } from '../../../gen-ts/src'

export const history1Mock: History = {
  id: 'hist1_id',
  previous_value: '{"name": "Old Company Name", "description": "Old description"}',
  new_value: '{"name": "New Company Name", "description": "New description"}',
  user_id: 'user1_id',
  modified_at: '2022-03-15T10:30:00Z',
  entity_type: 'COMPANY' as EntityType,
  entity_id: 'comp1_id',
}

export const history2Mock: History = {
  id: 'hist2_id',
  previous_value: '{"status": "PENDING_SIGNATURE"}',
  new_value: '{"status": "IN_PROGRESS"}',
  user_id: 'user1_id',
  modified_at: '2022-04-01T09:00:00Z',
  entity_type: 'JOB' as EntityType,
  entity_id: 'job1_id',
}

export const history3Mock: History = {
  id: 'hist3_id',
  previous_value: '{"amount": 50000, "description": "Old expense"}',
  new_value: '{"amount": 55000, "description": "Updated expense"}',
  user_id: 'user2_id',
  modified_at: '2022-05-10T14:15:00Z',
  entity_type: 'EXPENSEMONEY' as EntityType,
  entity_id: 'exp1_id',
}

export const historiesMock: History[] = [history1Mock, history2Mock, history3Mock]
