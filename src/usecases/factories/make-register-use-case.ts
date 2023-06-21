import { UsersRepositoryPrisma } from '@/repositories/prisma/PrismaUsersRepositoryImpl'
import { CreateUserUseCase } from '../CreateUserUseCase'

export function makeRegisterUseCase() {
  const usersRepository = new UsersRepositoryPrisma()
  const registerUseCase = new CreateUserUseCase(usersRepository)

  return registerUseCase
}
