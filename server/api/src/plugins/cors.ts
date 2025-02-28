import fp from 'fastify-plugin';
import cors from '@fastify/cors';

export default fp(async (fastify) => {
  fastify.register(cors, {
    origin: process.env.FRONTEND_URL || 'http://192.168.1.69:5173',
    credentials: true,
  });
});