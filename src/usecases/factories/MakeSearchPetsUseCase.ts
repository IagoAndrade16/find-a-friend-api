import { PetsRepositoryImpl } from '@/repositories/prisma/PetsRepositoryImpl'
import { SearchPetsUseCase } from '../SearchPetsUseCase'

export function makeSearchPetsUseCase() {
  const petsRepository = new PetsRepositoryImpl()
  const searchPetsUseCase = new SearchPetsUseCase(petsRepository)

  return searchPetsUseCase
}
