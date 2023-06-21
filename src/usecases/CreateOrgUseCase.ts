import { OrgsRepository } from '@/repositories/OrgsRepository'
import { Org } from '@prisma/client'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/OrgAlreadyExistsError'

interface CreateOrgUseCaseInput {
  name: string
  email: string
  password: string
  address: string
  phone: string
}

interface CreateOrgUseCaseOutput {
  org: Org
}

export class CreateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute(data: CreateOrgUseCaseInput): Promise<CreateOrgUseCaseOutput> {
    const orgAlreadyExists = await this.orgsRepository.findByEmail(data.email)

    if (orgAlreadyExists) {
      throw new OrgAlreadyExistsError()
    }

    const password_hash = await hash(data.password, 6)
    const org = await this.orgsRepository.create({
      ...data,
      password_hash,
    })

    return { org }
  }
}
