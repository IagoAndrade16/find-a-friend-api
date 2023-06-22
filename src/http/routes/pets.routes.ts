import { FastifyInstance } from 'fastify'
import { CreatePetController } from '../controllers/pets/CreatePetController'
import { verifyJwt } from '../middlewares/verifyJwt'
import { GetPetController } from '../controllers/pets/GetPetController'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets/:petId', GetPetController)

  app.post('/pets', { onRequest: verifyJwt }, CreatePetController)
}
