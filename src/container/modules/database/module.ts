import { ContainerModule } from 'inversify';
import { DataSource } from 'typeorm';
import pino from 'pino';

import * as Entities from '@/entities';

export type DatabaseModuleInterface = DataSource;

export const dataSource = new DataSource({
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [...Object.values(Entities)],
  // dropSchema: true,
  // synchronize: true,
  ssl: true,
});

export default new ContainerModule(async () => {
  try {
    await dataSource.initialize();
    pino().info(`${process.env.DB_TYPE} DB CONNECTED`);
  } catch (error) {
    pino().error('DB ERROR');
    pino().error(error);

    throw error;
  }
});
