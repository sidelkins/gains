import userRoutes from './userRoutes.js';

export default async function routes(fastify, options) {
  fastify.register(userRoutes, { prefix: '/api/user' });
}