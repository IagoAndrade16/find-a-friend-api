import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { PetsRepository } from '../PetsRepository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      city: data.city,
      description: data.description,
      orgId: data.orgId,
    } as Pet

    this.items.push(pet)

    return pet
  }

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async searchMany(q: string, city: string) {
    return this.items.filter(
      (item) =>
        item.city.includes(city) ||
        item.name.includes(q) ||
        item.description?.includes(q),
    )
  }
}
