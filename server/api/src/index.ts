import Fastify from 'fastify';

import dbPlugin from './plugins/db';
import authPlugin from './plugins/auth';
import corsPlugin from './plugins/cors';

import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import nutritionRoutes from './routes/nutrition';

async function start() {
  const fastify = Fastify({
    //logger: true
  });

  // Register plugins
  await fastify.register(corsPlugin);
  await fastify.register(dbPlugin);
  await fastify.register(authPlugin);

  // Routes
  const apiPrefix = { prefix: '/api' };
  
  fastify.register(authRoutes, apiPrefix);

  // Protected routes
  fastify.register(async (instance) => {
    instance.addHook('preHandler', instance.authenticate);
    instance.register(userRoutes);
    instance.register(nutritionRoutes);
  }, apiPrefix);

  // Catch-all route
  fastify.get('/', async () => {
    return { message: 'gains-api is running' };
  });

  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log('Server is running on port 3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();