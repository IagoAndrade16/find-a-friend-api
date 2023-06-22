import { PetsRepository } from '@/repositories/PetsRepository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

export type GetPetUseCaseInput = {
  petId: string
}

export class GetPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ petId }: GetPetUseCaseInput) {
    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return {
      pet,
    }
  }
}
