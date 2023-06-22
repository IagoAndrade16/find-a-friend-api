import { makeSearchPetsUseCase } from '@/usecases/factories/MakeSearchPetsUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function SearchPetsController(
  req: FastifyRequest,
  rep: FastifyReply,
) {
  const searchPetsParamsSchema = z.object({
    q: z.string(),
  })

  console.log(req)

  const searchPetsBodySchema = z.object({
    city: z.string(),
  })

  const { q } = searchPetsParamsSchema.parse(req.params)
  const { city } = searchPetsBodySchema.parse(req.body)

  const createPetUseCase = makeSearchPetsUseCase()

  const { pets } = await createPetUseCase.execute({ q, city })

  return rep.status(200).send({ pets })
}
