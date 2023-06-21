import { FastifyInstance } from 'fastify'
import { usersRoutes } from './users.routes'
import { petsRoutes } from './pets.routes'

export async function appRoutes(app: FastifyInstance) {
  app.register(usersRoutes)
  app.register(petsRoutes)
}
