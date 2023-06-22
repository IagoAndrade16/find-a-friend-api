import { PetsRepository } from '@/repositories/PetsRepository'

export type GetPetUseCaseInput = {
  q: string
  city: string
}

export class SearchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ q, city }: GetPetUseCaseInput) {
    const pets = await this.petsRepository.searchMany(q, city)

    return {
      pets,
    }
  }
}
