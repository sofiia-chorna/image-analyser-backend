import { DATA_TYPE } from '../common/data/data-type.enum.js';
import { collection, user, analyse, auth } from '../services/services.js';
import { Server } from './Server.js';

/*
  Handlers map
 */
const services = new Map([
    [DATA_TYPE.COLLECTION, collection],
    [DATA_TYPE.USER, user],
    [DATA_TYPE.ANALYSE, analyse],
    [DATA_TYPE.AUTH, auth]
]);

// Singleton instance
export const server = new Server({
    services: services
});
