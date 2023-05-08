import { ApiPath } from '../common/common.js';
import { initCollection } from './collection/collection.api.js';
import { initUser } from './user/user.api.js';
import { initAnalyse } from './analyse/analyse.api.js';

export function initApi(fastify, options, done) {
  // Retrieve services
  const { services: { collection, user, analyse } } = options;

  // Validate scheme of data
  // fastify.setValidatorCompiler(({ schema }) => {
  //   return data => schema.validate(data);
  // });

  // Register collection path & service
  fastify.register(initCollection, {
    services: {
      collection: collection,
    },
    prefix: ApiPath.COLLECTIONS
  });

  // Register user path & service
  fastify.register(initUser, {
    services: {
      user: user,
    },
    prefix: ApiPath.USERS
  });

  // Register analyse path & service
  fastify.register(initAnalyse, {
    services: {
      analyse: analyse,
    },
    prefix: ApiPath.ANALYSES
  });

  done();
}
