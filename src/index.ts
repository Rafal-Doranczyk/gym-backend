import 'reflect-metadata';

import container from './container';
import { ConfigSymbols } from 'container/symbols';
import { FastifyInstance } from 'fastify';
import { ConfigInterface } from 'container/modules/config';

/**
 * Run the server!
 */
async function startServer() {
  const server = await container.getAsync<FastifyInstance>(ConfigSymbols.Server);
  const { host, port } = container.get<ConfigInterface>(ConfigSymbols.Config);

  try {
    server.listen({ port, host });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

startServer();
