import { ResourceNotFoundError } from '@/usecases/errors/resource-not-found-error'
import { makeGetPetUseCase } from '@/usecases/factories/MakeGetPetUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function GetPetController(req: FastifyRequest, rep: FastifyReply) {
  const getPetParamsSchema = z.object({
    petId: z.string(),
  })

  try {
    const { petId } = getPetParamsSchema.parse(req.params)

    const createPetUseCase = makeGetPetUseCase()

    const { pet } = await createPetUseCase.execute({
      petId,
    })

    return rep.status(200).send({ pet })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return rep.status(400).send({ message: err.message })
    }

    throw err
  }
}
