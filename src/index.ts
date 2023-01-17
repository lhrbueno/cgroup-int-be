import 'express-async-errors'
import express from 'express'
import cors from 'cors'
import expressSession from 'express-session'
import MongoDBStore from 'connect-mongodb-session'

import { AppDataSource } from './DataSource'
import { ErrorMiddleware } from './middlewares/ErrorMiddleware'
import routes from './routes'

AppDataSource.initialize().then(() => {
  const app = express()

  const mongoStore = MongoDBStore(expressSession)

  const store = new mongoStore({
    collection: 'userSessions',
    uri: process.env.mongoURI,
    expires: 1000,
  })

  app.use(
    expressSession({
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 6 * 10000,
        sameSite: false,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      },
      secret: process.env.SECRET_SESS_KEY,
      store,
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
