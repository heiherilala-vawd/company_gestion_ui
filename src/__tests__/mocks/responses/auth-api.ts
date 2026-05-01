import { AuthResponse, CrupdateUser, LoginRequest } from '../../../gen-ts/src'

export const loginRequestMock: LoginRequest = {
  email: 'john.doe@company.com',
  password: 'securePassword123',
}

export const authResponseMock: AuthResponse = {
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  type: 'Bearer',
  id: 'user1_id',
  email: 'john.doe@company.com',
  role: 'ADMIN',
}

export const whoamiResponseMock: AuthResponse = {
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  type: 'Bearer',
  id: 'user1_id',
  email: 'john.doe@company.com',
  role: 'ADMIN',
}

export const failedLoginResponse = {
  statusCode: 401,
  body: {
    message: 'Invalid credentials',
  },
}

export const registerUserMock: CrupdateUser = {
  role: 'EMPLOYEE',
  first_name: 'Jane',
  last_name: 'Smith',
  sex: 'F',
  email: 'jane.smith@company.com',
  password: 'password123',
  comment: 'New employee registration',
}
