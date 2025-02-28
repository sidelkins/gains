import { FastifyInstance } from 'fastify';
import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import { users } from '../../db/schema';

export default async function (fastify: FastifyInstance) {
  fastify.post('/login', {
    schema: {
      body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email' },
          password: { type: 'string' }
        }
      }
    }
  }, async (request, reply) => {
    const { email, password } = request.body as { 
      email: string, 
      password: string 
    };
    
    try {
      // Find user by email
      const user = await fastify.db.query.users.findFirst({
        where: eq(users.email, email)
      });
      
      if (!user) {
        return reply.code(401).send({ error: 'Invalid credentials' });
      }
      
      // Verify password
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return reply.code(401).send({ error: 'Invalid credentials' });
      }
      
      // Create session
      const { sessionId, expiresAt } = await fastify.createSession(user.id);
      
      // Generate JWT token
      const token = fastify.jwt.sign({ id: user.id });
      
      // Set cookies
      reply.setCookie('sessionId', sessionId, {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        expires: expiresAt
      });
      
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