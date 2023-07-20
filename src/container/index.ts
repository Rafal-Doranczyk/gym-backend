import { Container } from 'inversify';

import Config, { ConfigInterface } from './modules/config';
import Server from './modules/server';
import Database from './modules/database';

import { ConfigSymbols } from './symbols';

const container = new Container();

container.load(Server);
container.load(Config);
container.load(Database);

export { ConfigInterface, ConfigSymbols };

export default container;
