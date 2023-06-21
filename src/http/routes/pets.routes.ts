import { FastifyInstance } from 'fastify'
import { CreatePetController } from '../controllers/pets/CreatePetController'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', CreatePetController)
}
