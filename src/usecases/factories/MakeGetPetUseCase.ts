import { PetsRepositoryImpl } from '@/repositories/prisma/PetsRepositoryImpl'
import { GetPetUseCase } from '../GetPetUseCase'

export function makeGetPetUseCase() {
  const petsRepository = new PetsRepositoryImpl()
  const getPetUseCase = new GetPetUseCase(petsRepository)

  return getPetUseCase
}
