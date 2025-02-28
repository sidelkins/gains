export default async function userRoutes(fastify, options) {
    fastify.get('/all', async (request, reply) => {
      return { users: ['Alice', 'Bob', 'Charlie'] };
    });
  
    fastify.get('/:id', async (request, reply) => {
      const { id } = request.params;
      return { user: { id, name: `User ${id}` } };
    });
  }
  