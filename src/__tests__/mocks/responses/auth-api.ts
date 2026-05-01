import { AuthResponse, CrupdateUser, LoginRequest } from '../../../gen-ts/src'

// Helper pour créer une réponse 200 avec un corps
export const mockSuccessResponse = (body: any) => ({
  statusCode: 200,
  body,
})

// Helper pour créer une réponse d'erreur
export const mockErrorResponse = (type: string, message: string, statusCode: number = 401) => ({
  statusCode,
  body: { type, message },
})

// Réponses de succès
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

// Exceptions API
export const badRequestException = mockErrorResponse('BadRequestException', 'Bad request', 400)
export const notAuthorizedException = mockErrorResponse(
  'NotAuthorizedException',
  'Not authorized',
  403,
)
export const resourceNotFoundException = mockErrorResponse(
  'ResourceNotFoundException',
  'Resource not found',
  404,
)
export const tooManyRequestsException = mockErrorResponse(
  'TooManyRequestsException',
  'Too many requests',
  429,
)
export const internalServerException = mockErrorResponse(
  'InternalServerException',
  'Unexpected error',
  500,
)

export const registerUserMock: CrupdateUser = {
  role: 'EMPLOYEE',
  first_name: 'Jane',
  last_name: 'Smith',
  sex: 'F',
  email: 'jane.smith@company.com',
  password: 'password123',
  comment: 'New employee registration',
}
