export class ApiError extends Error {
  public readonly statusCode: number

  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST)
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string) {
    super(message, HttpStatus.UNAUTHORIZED)
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: string) {
    super(message, HttpStatus.FORBIDDEN)
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string) {
    super(message, HttpStatus.NOT_FOUND)
  }
}

export class InternalServerError extends ApiError {
  constructor(message: string) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR)
  }
}

export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}
