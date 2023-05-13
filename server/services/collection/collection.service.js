import { collection as collectionRepository } from '../../data/repositories/repositories.js';
import { collection as elasticCollectionRepository } from '../../elastic/repositories/repositories.js';

/**
 * Collection service helper class
 */
class Collection {
  /**
   * @param {!Object} params
   * @return {Collection}
   */
  constructor(params) {
    // Get repositories from params
    const { collectionRepository, elasticCollectionRepository } = params;

    /**
     * @private
     * @type {function(*)}
     */
    this._collectionRepository = collectionRepository;

    /**
     * @private
     * @type {function(*)}
     */
    this._elasticCollectionRepository = elasticCollectionRepository;
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

// Initialize collection servise
export const collection = new Collection({
  collectionRepository: collectionRepository,
  elasticCollectionRepository: elasticCollectionRepository
});
