import { CollectionsApiPath, ControllerHook, HttpMethod } from '../../common/common.js';
import { wrapPayload } from '../helper/helper.js';

const initCollection = (fastify, opts, done) => {
  // Retrieve services
  const { collection: collectionService } = opts.services;

  // READ ALL
  fastify.route({
    method: HttpMethod.GET,
    url: CollectionsApiPath.ROOT,

    // Handle request
    [ControllerHook.HANDLER]: async (request) => {
      return await collectionService.getAll(request.query);
    },

    // Format response payload
    [ControllerHook.PRE_SERIALIZATION]: async (_request, _reply, payload) => {
      return wrapPayload(payload);
    },
  });

  // READ ONE
  fastify.route({
    method: HttpMethod.GET,
    url: CollectionsApiPath.$ID,

    // Handle request
    [ControllerHook.HANDLER]: async (request) => {
      return await collectionService.getById(request.params.id);
    }
  });

  // CREATE ONE
  fastify.route({
    method: HttpMethod.POST,
    url: CollectionsApiPath.ROOT,

    // Handle request
    [ControllerHook.HANDLER]: async (request) => {
      return await collectionService.insert(request.body);
    }
  });

  // UPDATE ONE
  fastify.route({
    method: HttpMethod.PUT,
    url: CollectionsApiPath.$ID,

    // Handle request
    [ControllerHook.HANDLER]: async (request) => {
      return await collectionService.update(request.params.id, request.body);
    }
  });

  // DELETE ONE
  fastify.route({
    method: HttpMethod.DELETE,
    url: CollectionsApiPath.$ID,

    // Handle request
    [ControllerHook.HANDLER]: async (request) => {
      return await collectionService.delete(request.params.id);
    },

    // Format response payload
    [ControllerHook.PRE_SERIALIZATION]: async (_request, _reply, payload) => {
      return { success: payload !== null };
    },
  });

  done();
};

export { initCollection };
