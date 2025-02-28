import Fastify from 'fastify';
import dbPlugin from './plugins/db';
import authPlugin from './plugins/auth';
import corsPlugin from './plugins/cors';
import authRoutes from './routes/auth';
import userRoutes from './routes/protected/user';

async function start() {
  const fastify = Fastify({
    logger: true
  });

  // Register plugins
  await fastify.register(corsPlugin);
  await fastify.register(dbPlugin);
  await fastify.register(authPlugin);

  // Register routes
  fastify.register(authRoutes, { prefix: '/auth' });
  fastify.register(userRoutes, { prefix: '/user' });

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