import { FastifyInstance } from 'fastify'
import { CreateUserController } from '../controllers/users/CreateUserController'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', CreateUserController)
}
