import 'reflect-metadata';
import { FastifyInstance } from 'fastify';

import container, { ConfigSymbols, ConfigInterface } from './container';

/**
 * Run the server!
 */
async function start() {
  const { host, port } = container.get<ConfigInterface>(ConfigSymbols.Config);

  const server = await container.getAsync<FastifyInstance>(ConfigSymbols.Server);

  try {
    server.swagger();
    server.listen({ port, host });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

start();
