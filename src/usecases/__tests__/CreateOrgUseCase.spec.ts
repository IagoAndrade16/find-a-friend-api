import { InMemoryOrgsRepository } from '@/repositories/in-memory/InMemoryOrgsRepository'
import { beforeEach, expect, it } from 'vitest'
import { CreateOrgUseCase } from '../CreateOrgUseCase'

let orgsRepo: InMemoryOrgsRepository
let sut: CreateOrgUseCase

beforeEach(() => {
  orgsRepo = new InMemoryOrgsRepository()
  sut = new CreateOrgUseCase(orgsRepo)
})

it('should be able to register a new org', async () => {
  const { org } = await sut.execute({
    address: 'address',
    email: 'email@example.com',
    name: 'Org Dog',
    password: '123456',
    phone: '123456789',
  })

  expect(org).toMatchObject({
    address: 'address',
    email: 'email@example.com',
    name: 'Org Dog',
    password_hash: expect.any(String),
    phone: '123456789',
  })
})
