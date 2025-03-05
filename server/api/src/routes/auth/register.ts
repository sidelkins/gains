import { FastifyInstance } from 'fastify';
import bcrypt from 'bcrypt';
import { users } from '../../db/schema';

export default async function (fastify: FastifyInstance) {
  fastify.post('/register', {
    schema: {
      body: {
        type: 'object',
        required: ['username', 'email', 'password'],
        properties: {
          username: { type: 'string' },
          email: { type: 'string', format: 'email' },
          password: { type: 'string', minLength: 6 },
          first_name: { type: 'string' },
          last_name: { type: 'string' }
        }
      }
    }
  }, async (request, reply) => {
    const { username, email, password, first_name, last_name } = request.body as { 
      username: string,
      email: string, 
      password: string, 
      first_name: string,
      last_name: string
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
        first_name,
        last_name
      }).returning({ id: users.id });

      const userId = result[0].id;

      // Generate JWT token
      const token = fastify.jwt.sign({ id: userId, username, email });

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
          id: userId,
          username,
          email
        }
      };
    } catch (err) {
      request.log.error(err);
      return reply.code(500).send({ error: 'Internal Server Error' });
    }
  });
}
