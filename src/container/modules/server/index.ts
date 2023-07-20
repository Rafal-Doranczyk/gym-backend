import fastify from 'fastify';
import { ContainerModule, interfaces } from 'inversify';

import ApplicationAPI from 'api';
import * as Plugins from './plugins';
import { ConfigSymbols } from '../../symbols';

export default new ContainerModule((bind) => {
  const server = fastify({
    logger: true,
    ajv: {
      customOptions: {
        allErrors: true,
        messages: true,
        coerceTypes: true,
        removeAdditional: true,
        // Dont get it, but it works only with this option
        keywords: ['kind'],
      },
    },
  });

  // PLUGINS
  Plugins.FastifyHelmetPlugin(server);
  Plugins.FastifyCORSPlugin(server);
  Plugins.FastifySwaggerPlugin(server);

  ApplicationAPI(server);

  bind(ConfigSymbols.Server).toDynamicValue((context: interfaces.Context) =>
    server.decorateRequest('container', { getter: () => context.container }),
  );
});
