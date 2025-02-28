import { FastifyInstance } from 'fastify';
import { eq } from 'drizzle-orm';
import { users } from '../../db/schema';

export default async function (fastify: FastifyInstance) {
  fastify.get('/me', {
    onRequest: [fastify.authenticate]
  }, async (request, reply) => {
    try {
      const user = await fastify.db.query.users.findFirst({
        where: eq(users.id, request.user!.id),
        columns: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
          password: false // Exclude password
        }
      });
      
      if (!user) {
        return reply.code(404).send({ error: 'User not found' });
      }
      
      return { user };
    } catch (err) {
      request.log.error(err);
      return reply.code(500).send({ error: 'Internal Server Error' });
    }
  });
}