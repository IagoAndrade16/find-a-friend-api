import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { PetsRepository } from '../PetsRepository'

export class PetsRepositoryImpl implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async searchMany(q: string, city: string) {
    const pets = await prisma.pet.findMany({
      where: {
        city: {
          contains: city,
        },
        name: {
          contains: q,
        },
        description: {
          contains: q,
        },
      },
    })

    return pets
  }
}
