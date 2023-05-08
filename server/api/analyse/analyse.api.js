import { AnalysesApiPath, ControllerHook, HttpMethod } from '../../common/common.js';
import { wrapPayload } from '../helper/helper.js';

const initAnalyse = (fastify, opts, done) => {
  // Retrieve services
  const { analyse: analyseService } = opts.services;

  // READ ALL
  fastify.route({
    method: HttpMethod.GET,
    url: AnalysesApiPath.ROOT,

    // Handle request
    [ControllerHook.HANDLER]: async (request) => {
      return await analyseService.getAll(request.query);
    },

    // Format response payload
    [ControllerHook.PRE_SERIALIZATION]: async (_request, _reply, payload) => {
      return wrapPayload(payload);
    },
  });

  // READ ONE
  fastify.route({
    method: HttpMethod.GET,
    url: AnalysesApiPath.$ID,

    // Handle request
    [ControllerHook.HANDLER]: async (request) => {
      return await analyseService.getById(request.params.id);
    }
  });

  // CREATE ONE
  fastify.route({
    method: HttpMethod.POST,
    url: AnalysesApiPath.ROOT,

    // Handle request
    [ControllerHook.HANDLER]: async (request) => {
      return await analyseService.insert(request.body);
    }
  });

  // UPDATE ONE
  fastify.route({
    method: HttpMethod.PUT,
    url: AnalysesApiPath.$ID,

    // Handle request
    [ControllerHook.HANDLER]: async (request) => {
      return await analyseService.update(request.params.id, request.body);
    }
  });

  // DELETE ONE
  fastify.route({
    method: HttpMethod.DELETE,
    url: AnalysesApiPath.$ID,

    // Handle request
    [ControllerHook.HANDLER]: async (request) => {
      return await analyseService.delete(request.params.id);
    },

    // Format response payload
    [ControllerHook.PRE_SERIALIZATION]: async (_request, _reply, payload) => {
      return { success: payload !== null };
    },
  });

  done();
};

export { initAnalyse };
