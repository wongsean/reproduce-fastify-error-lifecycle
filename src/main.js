import Fastify from 'fastify'

const fastify = await Fastify()

fastify.setErrorHandler((error, _req, reply) => {
  console.log('setErrorHandler')

  reply.status(400).send(error.message)
})

fastify.addHook('onError', async (_req, _reply, _error) => {
  console.log('onError')
})

fastify.get('/error', (_req, reply) => {
  reply.send(new Error('test error'))
})

await fastify.inject({
  method: 'GET',
  url: '/error',
})

// Console logs:
//   onError
//   setErrorHandler