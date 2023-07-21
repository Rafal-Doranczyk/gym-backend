import 'reflect-metadata';
import 'dotenv/config';
import { FastifyInstance } from 'fastify';

import container, { ConfigSymbols, ConfigModuleInterface } from './container';

/**
 * Run the server!
 */
async function start() {
  const { host, port } = container.get<ConfigModuleInterface>(ConfigSymbols.Config);
  const server = await container.getAsync<FastifyInstance>(ConfigSymbols.Server);

  try {
    server.swagger();
    server.listen({ port, host });
    server.log.info(`Server listening on ${host}:${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

start();
