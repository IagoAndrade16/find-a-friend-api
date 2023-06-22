import { FastifyInstance } from 'fastify'
import { CreateOrgController } from '../controllers/orgs/CreateOrgController'
import { AuthenticateOrgController } from '../controllers/orgs/AuthenticateOrgController'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', CreateOrgController)
  app.post('/orgs/session', AuthenticateOrgController)
}
