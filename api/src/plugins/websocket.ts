import fp from 'fastify-plugin';
import websocket from 'fastify-websocket';

export default fp(async (fastify, ops) => fastify.register(websocket), {
  name: 'websocket',
});
