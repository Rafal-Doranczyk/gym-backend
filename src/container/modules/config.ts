import { ContainerModule } from 'inversify';

import { ConfigSymbols } from '../symbols';

export type ConfigInterface = {
  port: number;
  host: string;
};

export default new ContainerModule((bind) => {
  const value: ConfigInterface = {
    port: +process.env.API_PORT,
    host: process.env.API_HOST,
  };

  bind(ConfigSymbols.Config).toConstantValue(value);
});
