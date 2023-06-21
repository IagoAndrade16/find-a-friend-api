import { Pet } from '@prisma/client'

interface CreatePetUseCaseInput {
  name: string
  email: string
  password: string
}

interface CreatePetUseCaseOutput {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    name,
    email,
    password,
  }: CreatePetUseCaseInput): Promise<CreatePetUseCaseOutput> {}
}
