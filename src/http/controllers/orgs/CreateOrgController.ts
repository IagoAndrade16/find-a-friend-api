import { OrgAlreadyExistsError } from '@/usecases/errors/OrgAlreadyExistsError'
import { makeCreateOrgUseCase } from '@/usecases/factories/MakeCreateOrgUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function CreateOrgController(
  req: FastifyRequest,
  rep: FastifyReply,
) {
  const createOrgBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    address: z.string(),
    phone: z.string(),
  })

  const { name, email, password, address, phone } = createOrgBodySchema.parse(
    req.body,
  )

  try {
    const createOrgUseCase = makeCreateOrgUseCase()

    const { org } = await createOrgUseCase.execute({
      name,
      email,
      password,
      address,
      phone,
    })

    return rep.status(201).send({ org })
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return rep.status(409).send({ message: err.message })
    }

    throw err
  }
}
