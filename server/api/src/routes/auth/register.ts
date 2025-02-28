import { FastifyInstance } from 'fastify';
import bcrypt from 'bcrypt';
import { users } from '../../db/schema';

export default async function (fastify: FastifyInstance) {
  fastify.post('/register', {
    schema: {
      body: {
        type: 'object',
        required: ['username', 'email', 'password', 'name'],
        properties: {
          username: { type: 'string' },
          email: { type: 'string', format: 'email' },
          password: { type: 'string', minLength: 6 },
          name: { type: 'string' }
        }
      }
    }
  }, async (request, reply) => {
    const { username, email, password, name } = request.body as { 
      username: string,
      email: string, 
      password: string, 
      name: string 
    };
    
    try {
      // Check if user already exists
      const existingUser = await fastify.db.query.users.findFirst({
        where: (users, { eq }) => eq(users.email, email)
      });
      
      if (existingUser) {
        return reply.code(400).send({ error: 'User already exists' });
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Create user
      const result = await fastify.db.insert(users).values({
        username,
        email,
        password: hashedPassword,
        name
      }).returning({ id: users.id });
      
      const userId = result[0].id;
      
      // Create session
      const { sessionId, expiresAt } = await fastify.createSession(userId);
      
      // Generate JWT token
      const token = fastify.jwt.sign({ id: userId });
      
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
          id: userId,
          username,
          email,
          name
        }
      };
    } catch (err) {
      request.log.error(err);
      return reply.code(500).send({ error: 'Internal Server Error' });
    }
  });
}