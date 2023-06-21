import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthUser(app: FastifyInstance) {
  await prisma.user.create({
    data: {
      name: 'Jonh Doe',
      email: 'jonhdoe@example',
      password_hash: await hash('123456', 6),
      created_at: new Date().toDateString(),
    },
  })

  const authResponse = await request(app.server).post('/session').send({
    email: 'email@example.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return { token }
}
