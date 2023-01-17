import { Request, Response } from 'express'
import { BadRequestError, HttpStatus } from '../helpers/ApiError'
import { UserRespository } from '../respositories/UserRespository'

import bcrypt from 'bcrypt'

export class UserController {
  public readonly SALT_ROUNDS = 30

  async create(request: Request, response: Response) {
    console.log('yo go herer', 'UsrController')

    const { name, email, password } = request.body

    console.log('atemp´ting to find one by email')

    console.log(UserRespository)

    try {
      await UserRespository.findOneBy({ email })
    } catch (err) {
      console.log(err)
    }
    const userExists = await UserRespository.findOneBy({ email })

    console.log(userExists)

    if (userExists) {
      throw new BadRequestError('User already exists!')
    }

    const hashedPassword = await bcrypt.hash(password, this.SALT_ROUNDS)

    console.log('yo got herer', 'attempting to create user repo')

    const persistUser = UserRespository.create({
      name,
      email,
      password: hashedPassword,
    })

    console.log('yo got herer', 'attempting to persist user')

    await UserRespository.save(persistUser)

    const { password: _, ...user } = persistUser

    request.session.regenerate(() => (request.session.user = user))

    return response.status(HttpStatus.CREATED).json(user)
  }

  async authenticate(request: Request, response: Response) {
    const { email, password } = request.body

    const user = await UserRespository.findOneBy({ email })

    if (!user) {
      throw new BadRequestError('Invalid email or password')
    }

    const verifyPass = await bcrypt.compare(password, user.password)

    if (!verifyPass) {
      throw new BadRequestError('Invalid email or password')
    }

    const { password: _, ...userLogin } = user

    request.session.regenerate(() => (request.session.user = userLogin))

    return response.status(HttpStatus.OK).json(userLogin)
  }

  async me(request: Request, response: Response) {
    return response.status(HttpStatus.OK).json(request.session.user)
  }
}
