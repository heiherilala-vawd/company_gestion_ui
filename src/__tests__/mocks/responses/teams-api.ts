import { Team } from '../../../gen-ts/src'
import { user1Mock, user2Mock } from './users-api.ts'

export const team1Mock: Team = {
  id: 'team1_id',
  name: 'Team Alpha',
  leader: user1Mock,
  members: [user1Mock, user2Mock],
}

export const team2Mock: Team = {
  id: 'team2_id',
  name: 'Team Beta',
  leader: user2Mock,
  members: [user2Mock],
}

export const teamsMock: Team[] = [team1Mock, team2Mock]
