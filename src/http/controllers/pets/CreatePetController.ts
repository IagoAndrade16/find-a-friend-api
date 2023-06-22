import { makeCreatePetUseCase } from '@/usecases/factories/MakeCreatePetUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function CreatePetController(
  req: FastifyRequest,
  rep: FastifyReply,
) {
  const createPetBodySchema = z.object({
    name: z.string(),
    city: z.string(),
    description: z.string(),
  })

  const { name, city, description } = createPetBodySchema.parse(req.body)

  const createPetUseCase = makeCreatePetUseCase()

  const { pet } = await createPetUseCase.execute({
    name,
    city,
    description,
    orgId: req.user.sub,
  })

  return rep.status(201).send({ pet })
}
