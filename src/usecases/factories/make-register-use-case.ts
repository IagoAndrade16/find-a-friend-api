import { UsersRepositoryImpl } from '@/repositories/prisma/UsersRepositoryImpl'
import { CreateUserUseCase } from '../CreateUserUseCase'

export function makeRegisterUseCase() {
  const usersRepository = new UsersRepositoryImpl()
  const registerUseCase = new CreateUserUseCase(usersRepository)

  return registerUseCase
}
