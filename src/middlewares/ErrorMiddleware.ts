import { NextFunction, Request, Response } from 'express'
import { ApiError, HttpStatus } from '../helpers/ApiError'

export const ErrorMiddleware = (
  error: Error & Partial<ApiError>,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR
  const message = error.statusCode ? error.message : 'Internal Server Error'
  return response.status(statusCode).json({ message })
}
