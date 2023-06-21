import { Org, Prisma } from '@prisma/client'
import { OrgsRepository } from '../OrgsRepository'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async create(data: Prisma.OrgUncheckedCreateInput) {
    const org = {
      address: data.address,
      email: data.email,
      name: data.name,
      password_hash: data.password_hash,
      phone: data.phone,
    } as Org

    this.items.push(org)

    return org
  }
}
