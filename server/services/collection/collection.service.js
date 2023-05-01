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
    return this._collectionRepository.getCollections(filter);
  }

  /**
   * @param {string} id
   * @return {Object}
   */
  getById(id) {
    return this._collectionRepository.getCollectionById(id);
  }

  /**
   * @param {!Object} collection
   * @return {Object}
   */
  async insert(collection) {
    const { id } = await this._collectionRepository.insertCollection(collection);
    // TODO insert to elastic search
    return this.getById(id);
  }

  /**
   * @param {string} id
   * @param {!Object} collection
   * @return {Object}
   */
  async update(id, collection) {
    await this._collectionRepository.updateCollection(collection);
    // TODO update to elastic search
    return this.getById(id);
  }

  // TODO Elastic Search method
}
