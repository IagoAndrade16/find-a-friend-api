import { InvalidCredentialsError } from '@/usecases/errors/invalid-credentials-error'
import { makeAuthenticateOrgUseCase } from '@/usecases/factories/MakeAuthenticateOrgUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function AuthenticateOrgController(
  req: FastifyRequest,
  rep: FastifyReply,
) {
  const autenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = autenticateBodySchema.parse(req.body)

  try {
    const autenticateUseCase = makeAuthenticateOrgUseCase()

    const { org } = await autenticateUseCase.execute({
      email,
      password,
    })

    const token = await rep.jwtSign(
      {},
      {
        sign: {
          sub: org.id,
        },
      },
    )

    return rep.status(200).send({
      token,
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return rep.status(400).send({ message: err.message })
    }

    throw err
  }
}
