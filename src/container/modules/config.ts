import { ContainerModule } from 'inversify';
import { config } from 'dotenv';

import { ConfigSymbols } from '../symbols';

export type ConfigInterface = {
  port: number;
  host: string;
};

export default new ContainerModule((bind) => {
  config();

  const value: ConfigInterface = {
    port: +process.env.API_PORT,
    host: process.env.API_HOST,
  };

  bind(ConfigSymbols.Config).toConstantValue(value);
});
