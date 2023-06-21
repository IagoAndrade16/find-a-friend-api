import { FastifyInstance } from 'fastify'
import { orgsRoutes } from './orgs.routes'
import { petsRoutes } from './pets.routes'
import { usersRoutes } from './users.routes'

export async function appRoutes(app: FastifyInstance) {
  app.register(usersRoutes)
  app.register(petsRoutes)
  app.register(orgsRoutes)
}
