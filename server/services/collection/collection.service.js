/**
 * Collection service helper class
 */
export class Collection {
  /**
   * @param {!Object} params
   * @return {Collection}
   */
  constructor(params) {
    // Get repositories from params
    const { collectionRepository } = params;

    /**
     * @private
     * @type {function(*)}
     */
    this._collectionRepository = collectionRepository;
  }

  /**
   * @param {!Object} filter
   * @return {!Array<!Object>}
   */
  getAll(filter) {
    return this._collectionRepository.getRecipes(filter);
  }

  /**
   * @param {string} id
   * @return {Object}
   */
  getById(id) {
    return this._collectionRepository.getRecipeById(id);
  }

  /**
   * @param {!Object} collection
   * @return {Object}
   */
  async insert(collection) {
    const { id } = await this._collectionRepository.createRecipe(collection);
    // TODO insert to elastic search
    return this.getById(id);
  }

  async update(id, recipe) {
    await this._recipeContentRepository.createRecipeContent({
      ...recipe,
      recipeId: id
    });
    // TODO update to elastic search
    return this.getById(id);
  }

  // TODO Elastic Search method
}
