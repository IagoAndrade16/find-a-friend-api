import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { User } from '@prisma/client'

interface CreateUserUseCaseInput {
  name: string
  email: string
  password: string
}

interface CreateUserUseCaseOutput {
  user: User
}

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: CreateUserUseCaseInput): Promise<CreateUserUseCaseOutput> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const password_hash = await hash(password, 6)
    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
      created_at: new Date().toString(),
    })

    return { user }
  }
}
