import { FastifyInstance } from 'fastify';
import bcrypt from 'bcrypt';
import { or, eq } from 'drizzle-orm';
import { users } from '../../db/schema';

export default async function (fastify: FastifyInstance) {
  fastify.post('/login', {
    schema: {
      body: {
        type: 'object',
        required: ['identifier', 'password'],
        properties: {
          identifier: { type: 'string' },
          password: { type: 'string' }
        }
      }
    }
  }, async (request, reply) => {
    const { identifier, password } = request.body as { 
      identifier: string,
      password: string 
    };
    
    try {
      // Find user by email OR username
      const user = await fastify.db.query.users.findFirst({
        where: or(eq(users.email, identifier), eq(users.username, identifier))
      });

      if (!user) {
        return reply.code(401).send({ error: 'Invalid credentials' });
      }

      // Verify password
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return reply.code(401).send({ error: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = fastify.jwt.sign({ 
        id: user.id, 
        username: user.username, 
        email: user.email 
      });

      // Set JWT as HTTP-only cookie
      reply.setCookie('jwt', token, {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7 // 7 days
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