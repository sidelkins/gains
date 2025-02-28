import fp from 'fastify-plugin';
import { db } from '../db';

export default fp(async (fastify) => {
  fastify.decorate('db', db);
});

declare module 'fastify' {
  interface FastifyInstance {
    db: typeof db;
  }
}