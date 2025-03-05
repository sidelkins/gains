import { FastifyInstance } from 'fastify';
import registerRoute from './register';
import loginRoute from './login';

export default async function (fastify: FastifyInstance) {
  fastify.register(registerRoute);
  fastify.register(loginRoute);
  
  fastify.post('/logout', async (_request, reply) => {
    // Clear the JWT cookie
    reply.clearCookie('jwt', {
      path: '/', 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'lax'
    });

    return reply.send({ message: 'Logged out successfully' });
  });
}