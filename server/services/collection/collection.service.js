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
    return this._elasticCollectionRepository.searchCollections(filter);
  }

  /**
   * @param {string} id
   * @return {Object}
   */
  getById(id) {
    return this._collectionRepository.getCollectionById(id);
  }

  /**
   * @param {!Object} data
   * @return {Object}
   */
  async insert(data) {
    // Add creation date
    const collection = { ...data, createdAt: new Date().toISOString() };

    // Create in the db
    const result = await this._collectionRepository.insertCollection(collection);

    // Create in elastic
    await this._elasticCollectionRepository.insertCollection(collection);

    // Done
    return result;
  }

  /**
   * @param {string} id
   * @param {!Object} collection
   * @return {Object}
   */
  async update(id, collection) {
    // Update in the db
    const result = await this._collectionRepository.updateCollection(id, collection);

    // Update in elastic
    await this._elasticCollectionRepository.updateCollection(collection);

    // Done
    return result;
  }

  /**
   * @param {string} id
   * @return {Object}
   */
  async delete(id) {
    // Delete in the db
    const result = await this._collectionRepository.deleteCollection(id);

    // Delete in elastic
    await this._elasticCollectionRepository.removeCollection(collection);

    // Done
    return result;

  }

  // TODO Elastic Search method
}

// Initialize collection service
export const collection = new Collection({
  collectionRepository: collectionRepository,
  elasticCollectionRepository: elasticCollectionRepository
});
