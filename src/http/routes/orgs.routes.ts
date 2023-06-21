import { FastifyInstance } from 'fastify'
import { CreateOrgController } from '../controllers/orgs/CreateOrgController'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', CreateOrgController)
}
