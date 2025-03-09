import fp from 'fastify-plugin';
import cors from '@fastify/cors';

export default fp(async (fastify) => {
  const origins = process.env.ORIGIN_URLS ? process.env.ORIGIN_URLS.split(',') : ['http://192.168.1.69:5173'];
  fastify.register(cors, {
    origin: origins,
    credentials: true,
  });
});