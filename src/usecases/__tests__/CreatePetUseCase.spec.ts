import { InMemoryPetsRepository } from '@/repositories/in-memory/InMemoryPetsRepository'
import { beforeEach, expect, it } from 'vitest'
import { CreatePetUseCase } from '../CreatePetUseCase'
import { randomUUID } from 'crypto'

let petsRepo: InMemoryPetsRepository
let sut: CreatePetUseCase

beforeEach(() => {
  petsRepo = new InMemoryPetsRepository()
  sut = new CreatePetUseCase(petsRepo)
})

it('should be able to register a new pet', async () => {
  const orgId = randomUUID()

  const { pet } = await sut.execute({
    city: 'city',
    description: 'desc',
    name: 'dog',
    orgId,
  })

  expect(pet.id).toEqual(expect.any(String))
})
