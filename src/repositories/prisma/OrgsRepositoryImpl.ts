import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { OrgsRepository } from '../OrgsRepository'

export class OrgsRepositoryImpl implements OrgsRepository {
  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({ data })

    return org
  }

  async findByEmail(email: string) {
    const org = await prisma.org.findFirst({
      where: {
        email,
      },
    })

    return org
  }
}
