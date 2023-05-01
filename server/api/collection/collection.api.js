import { CollectionsApiPath, ControllerHook, HttpMethod } from '../../common/common.js';

const initCollection = (fastify, opts, done) => {
  // Retrieve services
  const { collection: collectionService } = opts.services;

  // Register routes & handlers
  fastify.route({
    method: HttpMethod.GET,
    url: CollectionsApiPath.ROOT,
    [ControllerHook.HANDLER]: async req => {
      const { rows } = await collectionService.getAll(req.query);
      return rows;
    }
  });
  fastify.route({
    method: HttpMethod.GET,
    url: CollectionsApiPath.$ID,
    [ControllerHook.HANDLER]: async req => {
      return await collectionService.getById(req.params.id);
    }
  });
  fastify.route({
    method: HttpMethod.POST,
    url: CollectionsApiPath.ROOT,
    [ControllerHook.HANDLER]: async req => {
      return await collectionService.insert(req.body);
    }
  });
  fastify.route({
    method: HttpMethod.PUT,
    url: CollectionsApiPath.$ID,
    [ControllerHook.HANDLER]: async req => {
      return await collectionService.update(req.params.id, req.body);
    }
  });

  done();
};

export { initCollection };
