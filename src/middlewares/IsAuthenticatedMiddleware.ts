import { NextFunction, Request, Response } from 'express'
import { UnauthorizedError } from '../helpers/ApiError'

export const IsAuthenticatedMiddleware = () => {
  return async (request: Request, response: Response, next: NextFunction) => {
    if (!request.session.user) {
      throw new UnauthorizedError('User mut be signed in to reach this route')
    }

    return next()
  }
}
