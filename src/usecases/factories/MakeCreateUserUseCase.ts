import { UsersRepositoryImpl } from '@/repositories/prisma/UsersRepositoryImpl'
import { CreateUserUseCase } from '../CreateUserUseCase'

export function makeCreateUserUseCase() {
  const usersRepository = new UsersRepositoryImpl()
  const registerUseCase = new CreateUserUseCase(usersRepository)

  return registerUseCase
}
