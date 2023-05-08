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
    return await this._collectionRepository.insertCollection(collection);
    // TODO insert to elastic search
  }

  /**
   * @param {string} id
   * @param {!Object} collection
   * @return {Object}
   */
  async update(id, collection) {
    return await this._collectionRepository.updateCollection(id, collection);
    // TODO update to elastic search
  }

  /**
   * @param {string} id
   * @return {Object}
   */
  async delete(id) {
    return this._collectionRepository.deleteCollection(id);
  }

  // TODO Elastic Search method
}
