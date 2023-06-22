import { InMemoryPetsRepository } from '@/repositories/in-memory/InMemoryPetsRepository'
import { randomUUID } from 'crypto'
import { beforeEach, expect, it } from 'vitest'
import { GetPetUseCase } from '../GetPetUseCase'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let petsRepo: InMemoryPetsRepository
let sut: GetPetUseCase

beforeEach(() => {
  petsRepo = new InMemoryPetsRepository()
  sut = new GetPetUseCase(petsRepo)
})

it('should be able to get a existent pet', async () => {
  const orgId = randomUUID()

  const createdPet = await petsRepo.create({
    city: 'city',
    description: 'desc',
    name: 'dog',
    orgId,
  })

  const { pet } = await sut.execute({
    petId: createdPet.id,
  })

  expect(pet.id).toEqual(createdPet.id)
})

it('should be able to get a existent pet', async () => {
  expect(
    async () =>
      await sut.execute({
        petId: '321',
      }),
  ).rejects.toBeInstanceOf(ResourceNotFoundError)
})
