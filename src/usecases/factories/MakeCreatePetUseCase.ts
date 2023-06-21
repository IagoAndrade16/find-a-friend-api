import { PetsRepositoryImpl } from '@/repositories/prisma/PetsRepositoryImpl'
import { CreatePetUseCase } from '../CreatePetUseCase'

export function makeCreatePetUseCase() {
  const petsRepository = new PetsRepositoryImpl()
  const createPetUseCase = new CreatePetUseCase(petsRepository)

  return createPetUseCase
}
