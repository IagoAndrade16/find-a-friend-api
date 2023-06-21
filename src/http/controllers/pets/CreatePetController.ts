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
    orgId: z.string(),
  })

  const { name, city, description, orgId } = createPetBodySchema.parse(req.body)

  const createPetUseCase = makeCreatePetUseCase()

  const { pet } = await createPetUseCase.execute({
    name,
    city,
    description,
    orgId,
  })

  return rep.status(201).send({ pet })
}
