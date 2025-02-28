import { FastifyInstance } from 'fastify';
import registerRoute from './register';
import loginRoute from './login';
import refreshRoute from './refresh';

export default async function (fastify: FastifyInstance) {
  fastify.register(registerRoute);
  fastify.register(loginRoute);
  fastify.register(refreshRoute);
  
  // Logout route
  fastify.post('/logout', async (request, reply) => {
    return reply.clearCookie('sessionId').send({ success: true });
  });
}