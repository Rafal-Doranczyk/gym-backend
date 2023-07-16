import { Container } from 'inversify';

import Config from './modules/config';
import Server from './modules/server';
// import Database from './db';

const container = new Container();

container.load(Server);
container.load(Config);
// container.load(Database)

export default container;
