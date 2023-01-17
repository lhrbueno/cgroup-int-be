import { AppDataSource } from '../DataSource'
import { User } from '../entities/User'

export const UserRespository = AppDataSource.getRepository(User)
