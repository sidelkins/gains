import fp from 'fastify-plugin';
import jwt from '@fastify/jwt';
import cookie from '@fastify/cookie';
import { randomUUID } from 'crypto';
import { eq } from 'drizzle-orm';
import { sessions } from '../db/schema';

export default fp(async (fastify) => {
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

  // Create session
  fastify.decorate('createSession', async (userId: number) => {
    const sessionId = randomUUID();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days from now
    
    await fastify.db.insert(sessions).values({
      id: sessionId,
      userId,
      expiresAt
    });
    
    return {
      sessionId,
      expiresAt
    };
  });

  // Verify session
  fastify.decorate('verifySession', async (sessionId: string) => {
    if (!sessionId) return null;
    
    const session = await fastify.db.query.sessions.findFirst({
      where: eq(sessions.id, sessionId),
      with: {
        user: true
      }
    });
    
    if (!session || new Date(session.expiresAt) < new Date()) {
      return null;
    }
    
    return session;
  });

  // Authentication decorator
  fastify.decorate('authenticate', async (request, reply) => {
    try {
      // First try JWT token
      await request.jwtVerify();
    } catch (err) {
      // If JWT fails, try refresh token from cookie
      const sessionId = request.cookies.sessionId;
      if (!sessionId) {
        return reply.code(401).send({ error: 'Unauthorized' });
      }
      
      const session = await fastify.verifySession(sessionId);
      if (!session) {
        return reply.clearCookie('sessionId').code(401).send({ error: 'Unauthorized' });
      }
      
      // Set user in request
      request.user = { id: session.userId };
    }
  });
});

// Add types
declare module 'fastify' {
  interface FastifyInstance {
    createSession: (userId: number) => Promise<{ sessionId: string, expiresAt: Date }>;
    verifySession: (sessionId: string) => Promise<any>;
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
  
  interface FastifyRequest {
    user?: { id: number };
  }
}