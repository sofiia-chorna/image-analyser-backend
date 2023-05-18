import { UsersApiPath, ControllerHook, HttpMethod } from '../../common/common.js';
import { wrapPayload, wrapResponse } from '../helper/helper.js';

const initUser = (fastify, opts, done) => {
  // Retrieve services
  const { user: userService } = opts.services;

  // READ ALL
  fastify.route({
    method: HttpMethod.GET,
    url: UsersApiPath.ROOT,

    // Handle request
    [ControllerHook.HANDLER]: async (request) => {
      return await userService.getAll(request.query);
    },

    // Format response payload
    [ControllerHook.PRE_SERIALIZATION]: async (_request, _reply, payload) => {
      return wrapResponse(payload);
    },
  });

  // READ ONE
  fastify.route({
    method: HttpMethod.GET,
    url: UsersApiPath.$ID,

    // Handle request
    [ControllerHook.HANDLER]: async (request) => {
      return await userService.getById(request.params.id);
    }
  });

  // CREATE ONE
  fastify.route({
    method: HttpMethod.POST,
    url: UsersApiPath.ROOT,

    // Wrap payload
    [ControllerHook.PRE_HANDLER]: async (request, _reply, hookDone) => {
      request.body = wrapPayload(request.body, false);
      hookDone();
    },

    // Handle request
    [ControllerHook.HANDLER]: async (request) => {
      return await userService.insert(request.body);
    }
  });

  // UPDATE ONE
  fastify.route({
    method: HttpMethod.PUT,
    url: UsersApiPath.$ID,

    // Wrap payload
    [ControllerHook.PRE_HANDLER]: (request, _reply, hookDone) => {
      wrapPayload(request.body, true);
      hookDone();
    },

    // Handle request
    [ControllerHook.HANDLER]: async (request) => {
      return await userService.update(request.params.id, request.body);
    }
  });

  // DELETE ONE
  fastify.route({
    method: HttpMethod.DELETE,
    url: UsersApiPath.$ID,

    // Handle request
    [ControllerHook.HANDLER]: async (request) => {
      return await userService.delete(request.params.id);
    },

    // Format response payload
    [ControllerHook.PRE_SERIALIZATION]: async (_request, _reply, payload) => {
      return { success: payload !== null };
    },
  });

  done();
};

export { initUser };
