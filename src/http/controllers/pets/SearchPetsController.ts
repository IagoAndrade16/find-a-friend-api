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

  const { q } = searchPetsParamsSchema.parse(req.params)

  const createPetUseCase = makeSearchPetsUseCase()

  const { pets } = await createPetUseCase.execute({ q })

  return rep.status(200).send({ pets })
}
