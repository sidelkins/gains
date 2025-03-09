import { FastifyRequest } from "fastify";

export function getUserIdFromRequest(user: any) {
    return user.id;
}