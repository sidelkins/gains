import { FastifyInstance } from 'fastify';
import { supplementEntries, users } from '../../db/schema';
import { and, eq, inArray } from 'drizzle-orm';
import { request } from 'http';

export default async function (fastify: FastifyInstance) {    
      fastify.get('/supplements/entries', async (request, reply) => {
        const user = request.user as User;
        const userId = user.id;
        const entries = await fastify.db.select().from(supplementEntries).where(eq(supplementEntries.userId, userId));
        return reply.send(entries);
      }
    )
}