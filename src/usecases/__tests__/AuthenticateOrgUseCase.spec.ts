import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/InMemoryOrgsRepository'
import { AuthenticateOrgUseCase } from '../AuthenticateOrgUseCase'

let orgsRepo: InMemoryOrgsRepository
let sut: AuthenticateOrgUseCase

beforeEach(() => {
  orgsRepo = new InMemoryOrgsRepository()
  sut = new AuthenticateOrgUseCase(orgsRepo)
})

describe('Authenticate org use case', () => {
  it('should be able to authenticate', async () => {
    await orgsRepo.create({
      address: 'address',
      email: 'email@example.com',
      name: 'Org Dog',
      password_hash: await hash('123456', 6),
      phone: '123456789',
    })

    const { org } = await sut.execute({
      email: 'email@example.com',
      password: '123456',
    })

    expect(org).toMatchObject({
      address: 'address',
      email: 'email@example.com',
      name: 'Org Dog',
      password_hash: expect.any(String),
      phone: '123456789',
    })
  })

  it('should not be able to authenticate with wrong email', async () => {
    await orgsRepo.create({
      address: 'address',
      email: 'email@example.com',
      name: 'Org Dog',
      password_hash: await hash('123456', 6),
      phone: '123456789',
    })

    await expect(
      async () =>
        await sut.execute({
          email: 'wrong@email.com',
          password: '123456',
        }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await orgsRepo.create({
      address: 'address',
      email: 'email@example.com',
      name: 'Org Dog',
      password_hash: await hash('123456', 6),
      phone: '123456789',
    })

    await expect(
      async () =>
        await sut.execute({
          email: 'test@email.com',
          password: '654321',
        }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
