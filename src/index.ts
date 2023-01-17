import 'express-async-errors'
import express from 'express'
import cors from 'cors'
import session from 'express-session'

import { AppDataSource } from './config/DataSource'
import { ErrorMiddleware } from './middlewares/ErrorMiddleware'
import routes from './routes'

AppDataSource.initialize().then(() => {
  const app = express()

  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 6 * 10000 },
      secret: 'process.env.SECRET_SESS_KEY',
    })
  )

  app.disable('x-powered-by')

  app.use(
    cors({
      origin: ['http://localhost:4200'],
      credentials: true,
    })
  )

  app.use(express.json())

  app.use(routes)

  app.use(ErrorMiddleware)
  return app.listen(process.env.PORT)
})
