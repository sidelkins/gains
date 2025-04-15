import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { nutritionEntries, users } from '../../db/schema';
import { and, eq, inArray } from 'drizzle-orm';
import { getUserIdFromRequest } from '../../handlers';

export default async function (fastify: FastifyInstance) {    
    fastify.get('/nutrition', async (request: FastifyRequest, reply: FastifyReply) => {
        const entries = await fastify.db.select()
                                        .from(nutritionEntries)
                                        .where(
                                          eq(nutritionEntries.userId, getUserIdFromRequest(request.user))
                                        );
        return reply.send(entries);
    });

    fastify.get('/nutrition/entries/:date', async (request: FastifyRequest<{ Params: { date: string } }>, reply: FastifyReply) => {
      const { date } = request.params;
      const entries = await fastify.db.select()
        .from(nutritionEntries)
        .where(
          and(
            eq(nutritionEntries.userId, getUserIdFromRequest(request.user)),
            eq(nutritionEntries.date, date)
          )
        );
    
      return reply.send(entries);
    });

    fastify.post('/nutrition', {
      schema: {
        body: {
          type: 'object',
          required: ['date'],
          properties: {
            date: { type: 'string', format: 'date' },
            description: { type: 'string' },
            calories: { type: 'number', default: 0 },
            protein: { type: 'number', default: 0 },
            carbs: { type: 'number', default: 0 },
            fat: { type: 'number', default: 0 },
          }
        }
      }
    }, async (request: FastifyRequest, reply: FastifyReply) => {
      const userId = getUserIdFromRequest(request.user);
      const {
        date,
        description,
        calories = 0,
        protein = 0,
        carbs = 0,
        fat = 0,
      }: any = request.body;
    
      const [newEntry] = await fastify.db.insert(nutritionEntries).values({
        userId,
        date: date || new Date().toISOString().split('T')[0],
        description,
        calories,
        protein,
        carbs,
        fat,
        createdAt: new Date().toISOString(),
      }).returning();
    
      return reply.status(201).send(newEntry);
    });

    fastify.delete('/nutrition', async (request: FastifyRequest, reply: FastifyReply) => {
      const userId = getUserIdFromRequest(request.user);
      const { ids }: any = request.body;
    
      if (!ids || !Array.isArray(ids)) {
        return reply.status(400).send({ error: 'Invalid request body. Expected an array of IDs.' });
      }
    
      try {
        // Delete the entries with the provided IDs
        await fastify.db
          .delete(nutritionEntries)
          .where(
            and(
              inArray(nutritionEntries.id, ids),
              eq(nutritionEntries.userId, userId)
            )
          )
          .execute();
    
        return reply.status(200).send({ message: 'Entries deleted successfully' });
      } catch (error) {
        console.error('Failed to delete entries:', error);
        return reply.status(500).send({ error: 'Failed to delete entries' });
      }
    });
      
}