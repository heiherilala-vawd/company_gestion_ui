import { User, CrupdateUser, Role, Sex } from '../../../gen-ts/src'

export const user1Mock: User = {
  id: 'user1_id',
  role: 'ADMIN' as Role,
  first_name: 'John',
  last_name: 'Doe',
  sex: 'M' as Sex,
  email: 'john.doe@company.com',
  comment: 'Main admin user',
  created_at: '2021-01-15T08:30:00Z',
  updated_at: '2022-06-20T14:15:00Z',
  created_by: {
    id: 'system_id',
    role: 'ADMIN' as Role,
    first_name: 'System',
    last_name: 'Admin',
    sex: 'M' as Sex,
    email: 'system@company.com',
  },
  updated_by: {
    id: 'user1_id',
    role: 'ADMIN' as Role,
    first_name: 'John',
    last_name: 'Doe',
    sex: 'M' as Sex,
    email: 'john.doe@company.com',
  },
}

export const user2Mock: User = {
  id: 'user2_id',
  role: 'EMPLOYEE' as Role,
  first_name: 'Jane',
  last_name: 'Smith',
  sex: 'F' as Sex,
  email: 'jane.smith@company.com',
  comment: 'Field worker',
  created_at: '2021-03-10T09:00:00Z',
  updated_at: '2022-05-15T11:30:00Z',
  created_by: {
    id: 'user1_id',
    role: 'ADMIN' as Role,
    first_name: 'John',
    last_name: 'Doe',
    sex: 'M' as Sex,
    email: 'john.doe@company.com',
  },
  updated_by: {
    id: 'user1_id',
    role: 'ADMIN' as Role,
    first_name: 'John',
    last_name: 'Doe',
    sex: 'M' as Sex,
    email: 'john.doe@company.com',
  },
}

export const user3Mock: User = {
  id: 'user3_id',
  role: 'WAREHOUSE_WORKER' as Role,
  first_name: 'Bob',
  last_name: 'Johnson',
  sex: 'M' as Sex,
  email: 'bob.johnson@company.com',
  comment: 'Warehouse operator',
  created_at: '2021-06-01T08:00:00Z',
  updated_at: '2022-04-10T16:45:00Z',
  created_by: {
    id: 'user1_id',
    role: 'ADMIN' as Role,
    first_name: 'John',
    last_name: 'Doe',
    sex: 'M' as Sex,
    email: 'john.doe@company.com',
  },
  updated_by: {
    id: 'user1_id',
    role: 'ADMIN' as Role,
    first_name: 'John',
    last_name: 'Doe',
    sex: 'M' as Sex,
    email: 'john.doe@company.com',
  },
}

export const usersMock: User[] = [user1Mock, user2Mock, user3Mock]

export const crupdateUsersMock: CrupdateUser[] = [
  {
    id: 'user1_id',
    role: 'ADMIN' as Role,
    first_name: 'John',
    last_name: 'Doe',
    sex: 'M' as Sex,
    email: 'john.doe@company.com',
    comment: 'Updated admin',
  },
  {
    id: 'user4_id',
    role: 'EMPLOYEE' as Role,
    first_name: 'Alice',
    last_name: 'Brown',
    sex: 'F' as Sex,
    email: 'alice.brown@company.com',
    password: 'newPass456',
    comment: 'New employee',
  },
]
