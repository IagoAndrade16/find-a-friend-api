import { OrgsRepositoryImpl } from '@/repositories/prisma/OrgsRepositoryImpl'
import { CreateOrgUseCase } from '../CreateOrgUseCase'

export function makeCreateOrgUseCase() {
  const orgsRepository = new OrgsRepositoryImpl()
  const createOrgUseCase = new CreateOrgUseCase(orgsRepository)

  return createOrgUseCase
}
