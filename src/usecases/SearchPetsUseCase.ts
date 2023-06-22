import { PetsRepository } from '@/repositories/PetsRepository'

export type GetPetUseCaseInput = {
  city: string
}

export class SearchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ city }: GetPetUseCaseInput) {
    const pets = await this.petsRepository.searchMany(city)

    return {
      pets,
    }
  }
}
