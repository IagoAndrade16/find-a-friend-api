import { PetsRepository } from '@/repositories/PetsRepository'

export type GetPetUseCaseInput = {
  q: string
}

export class SearchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ q }: GetPetUseCaseInput) {
    const pets = await this.petsRepository.searchMany(q)

    return {
      pets,
    }
  }
}
