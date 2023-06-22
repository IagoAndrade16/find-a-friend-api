import { PetsRepository } from '@/repositories/PetsRepository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchPetsUseCase } from '../SearchPetsUseCase'
import { InMemoryPetsRepository } from '@/repositories/in-memory/InMemoryPetsRepository'
import { randomUUID } from 'crypto'

let petsRepo: PetsRepository
let sut: SearchPetsUseCase

beforeEach(async () => {
  petsRepo = new InMemoryPetsRepository()
  sut = new SearchPetsUseCase(petsRepo)
})

describe('Search pets use case', () => {
  it('should be able to search for pets', async () => {
    const orgId = randomUUID()

    await petsRepo.create({
      city: 'Volta Redonda',
      description: 'desc',
      name: 'dog',
      orgId,
    })

    await petsRepo.create({
      city: 'Barra Mansa',
      description: 'desc',
      name: 'dog',
      orgId,
    })

    const { pets } = await sut.execute({
      city: 'Barra',
      q: 'mansa',
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ city: 'Barra Mansa' })])
  })

  it('should return empty list if pets not found', async () => {
    const { pets } = await sut.execute({
      city: 'Barra',
      q: 'q',
    })

    expect(pets).toHaveLength(0)
  })
})
