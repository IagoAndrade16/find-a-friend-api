import { UserAlreadyExistsError } from '@/usecases/errors/UserAlreadyExistsError'
import { makeCreateUserUseCase } from '@/usecases/factories/MakeCreateUserUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function CreateUserController(
  req: FastifyRequest,
  rep: FastifyReply,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(req.body)

  try {
    const registerUseCase = makeCreateUserUseCase()

    await registerUseCase.execute({
      name,
      email,
      password,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return rep.status(409).send({ message: err.message })
    }

    throw err
  }

  return rep.status(201).send()
}
