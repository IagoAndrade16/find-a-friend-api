import { FastifyInstance } from 'fastify'
import { CreatePetController } from '../controllers/pets/CreatePetController'
import { verifyJwt } from '../middlewares/verifyJwt'

export async function petsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/pets', CreatePetController)
}
