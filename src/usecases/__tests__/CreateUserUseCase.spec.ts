import { InMemoryUsersRepository } from '@/repositories/in-memory/InMemoryUsersRepository'
import { compare } from 'bcryptjs'
import { beforeEach, expect, it } from 'vitest'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'
import { CreateUserUseCase } from '../CreateUserUseCase'

let usersRepo: InMemoryUsersRepository
let sut: CreateUserUseCase

beforeEach(() => {
  usersRepo = new InMemoryUsersRepository()
  sut = new CreateUserUseCase(usersRepo)
})

it('should hash user password upon registration', async () => {
  const { user } = await sut.execute({
    name: 'Jonh Doe',
    email: 'test@email.com',
    password: '123456',
  })

  const isPasswordConrrectlyHashed = await compare('123456', user.password_hash)

  expect(isPasswordConrrectlyHashed).toBeTruthy()
})

it('should not be able to register with same email twice', async () => {
  const email = 'jonhdoe@example.com'

  await sut.execute({
    name: 'Jonh Doe',
    email,
    password: '123456',
  })

  await expect(() =>
    sut.execute({
      name: 'Jonh Doe',
      email,
      password: '123456',
    }),
  ).rejects.toBeInstanceOf(UserAlreadyExistsError)
})

it('should be able to register', async () => {
  const email = 'jonhdoe@example.com'

  const { user } = await sut.execute({
    name: 'Jonh Doe',
    email,
    password: '123456',
  })

  expect(user.id).toEqual(expect.any(String))
})
