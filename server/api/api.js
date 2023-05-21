import { ApiPath, DATA_TYPE } from '../common/common.js';
import { initCollection } from './collection/collection.api.js';
import { initUser } from './user/user.api.js';
import { initAnalyse } from './analyse/analyse.api.js';
import { initAuth } from './auth/auth.api.js';

export function initApi(fastify, options, done) {
  // Retrieve services
  const { services } = options;

  // Validate scheme of data
  // fastify.setValidatorCompiler(({ schema }) => {
  //   return data => schema.validate(data);
  // });

  // Register collection path & service
  fastify.register(initCollection, {
    services: {
      collection: services.get(DATA_TYPE.COLLECTION),
    },
    prefix: ApiPath.COLLECTIONS
  });

  // Register user path & service
  fastify.register(initUser, {
    services: {
      user: services.get(DATA_TYPE.USER),
    },
    prefix: ApiPath.USERS
  });

  // Register analyse path & service
  fastify.register(initAnalyse, {
    services: {
      analyse: services.get(DATA_TYPE.ANALYSE),
    },
    prefix: ApiPath.ANALYSES
  });

  // Register auth path & service
  fastify.register(initAuth, {
    services: {
      auth: services.get(DATA_TYPE.AUTH),
    },
    prefix: ApiPath.AUTH
  });

  done();
}
