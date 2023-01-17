import { AppDataSource } from '../config/DataSource'
import { User } from '../entities/User'

export const UserRespository = AppDataSource.getRepository(User)
