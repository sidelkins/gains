import fp from 'fastify-plugin';
import jwt from '@fastify/jwt';
import cookie from '@fastify/cookie';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

export default fp(async (fastify: FastifyInstance) => {
  // Register JWT plugin
  await fastify.register(jwt, {
    secret: process.env.JWT_SECRET || 'supersecretkey',
    sign: {
      expiresIn: '15m' // Short-lived token
    }
  });

  // Register cookie plugin
  await fastify.register(cookie, {
    secret: process.env.COOKIE_SECRET || 'anothersupersecretkey',
    hook: 'onRequest',
  });

  // Authentication decorator
  fastify.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // Verify JWT token
      await request.jwtVerify();
    } catch (err) {
      return reply.code(401).send({ error: 'Unauthorized' });
    }
  });
});

// Add types
declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}