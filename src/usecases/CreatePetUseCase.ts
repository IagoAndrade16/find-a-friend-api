import { PetsRepository } from '@/repositories/PetsRepository'
import { Pet } from '@prisma/client'

interface CreatePetUseCaseInput {
  name: string
  description: string
  city: string
  orgId: string
}

interface CreatePetUseCaseOutput {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    name,
    description,
    city,
    orgId,
  }: CreatePetUseCaseInput): Promise<CreatePetUseCaseOutput> {
    const pet = await this.petsRepository.create({
      city,
      name,
      description,
      orgId,
    })

    return { pet }
  }
}
