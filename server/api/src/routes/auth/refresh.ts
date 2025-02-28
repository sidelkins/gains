import { FastifyInstance } from 'fastify';
import { eq } from 'drizzle-orm';
import { users } from '../../db/schema';

export default async function (fastify: FastifyInstance) {
  fastify.post('/refresh', async (request, reply) => {
    try {
      const sessionId = request.cookies.sessionId;
      
      if (!sessionId) {
        return reply.code(401).send({ error: 'No session found' });
      }
      
      const session = await fastify.verifySession(sessionId);
      
      if (!session) {
        return reply.clearCookie('sessionId').code(401).send({ error: 'Session expired' });
      }
      
      // Get user
      const user = await fastify.db.query.users.findFirst({
        where: eq(users.id, session.userId)
      });
      
      if (!user) {
        return reply.clearCookie('sessionId').code(401).send({ error: 'User not found' });
      }
      
      // Generate new JWT token
      const token = fastify.jwt.sign({ id: user.id });
      
      return { 
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          name: user.name
        }
      };
    } catch (err) {
      request.log.error(err);
      return reply.code(500).send({ error: 'Internal Server Error' });
    }
  });
}