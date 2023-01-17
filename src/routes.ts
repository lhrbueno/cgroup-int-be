import { Router } from 'express'
import { UserController } from './controllers/UserController'
import { IsAuthenticatedMiddleware } from './middlewares/IsAuthenticatedMiddleware'

const routes = Router()

routes.post('/api/v1/auth/register', new UserController().create)
routes.post('/api/v1/auth/authenticate', new UserController().authenticate)

routes.get(
  '/api/v1/users/me',
  IsAuthenticatedMiddleware(),
  new UserController().me
)

export default routes
