import { ApiPath } from '../common/enums/enums.js';
// import { initRecipe } from './recipe/recipe.api.js';

export function initApi(fastify, { services: { recipe }}, done) {
  // Validate scheme of data
  fastify.setValidatorCompiler(({ schema }) => {
    return data => schema.validate(data);
  });

  // Register routes
  // fastify.register(initRecipe, {
  //   services: { recipe },
  //   prefix: ApiPath.RECIPES
  // });

  done();
}
