import { CollectionsApiPath, ControllerHook, HttpMethod } from '../../common/common.js';

const initCollection = (fastify, opts, done) => {
  // Retrieve services
  const { collection: collectionService } = opts.services;

  // Register routes & handlers
  fastify.route({
    method: HttpMethod.GET,
    url: CollectionsApiPath.ROOT,
    [ControllerHook.HANDLER]: async (request) => {
      return await collectionService.getAll(request.query);
    },
    [ControllerHook.PRE_SERIALIZATION]: async (_request, _reply, payload) => {
      return { data: payload, size: payload.length };
    },
  });
  fastify.route({
    method: HttpMethod.GET,
    url: CollectionsApiPath.$ID,
    [ControllerHook.HANDLER]: async (request) => {
      return await collectionService.getById(request.params.id);
    }
  });
  fastify.route({
    method: HttpMethod.POST,
    url: CollectionsApiPath.ROOT,
    [ControllerHook.HANDLER]: async (request) => {
      return await collectionService.insert(request.body);
    }
  });
  fastify.route({
    method: HttpMethod.PUT,
    url: CollectionsApiPath.$ID,
    [ControllerHook.HANDLER]: async (request) => {
      return await collectionService.update(request.params.id, request.body);
    }
  });
  fastify.route({
    method: HttpMethod.DELETE,
    url: CollectionsApiPath.$ID,
    [ControllerHook.HANDLER]: async (request) => {
      return await collectionService.delete(request.params.id);
    },
    [ControllerHook.PRE_SERIALIZATION]: async (_request, _reply, payload) => {
      return { success: payload !== null };
    },
  });

  done();
};

export { initCollection };
