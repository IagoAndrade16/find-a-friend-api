import { OrgsRepositoryImpl } from '@/repositories/prisma/OrgsRepositoryImpl'
import { AuthenticateOrgUseCase } from '../AuthenticateOrgUseCase'

export function makeAuthenticateOrgUseCase() {
  const orgsRepository = new OrgsRepositoryImpl()
  const createOrgUseCase = new AuthenticateOrgUseCase(orgsRepository)

  return createOrgUseCase
}
