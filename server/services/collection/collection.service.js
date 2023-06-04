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
  async getAll(filter) {
    return await this._elasticCollectionRepository.searchCollections(filter);
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
    // Create in the db
   const { id } = await this._collectionRepository.insertCollection(collection);
   return id
    // Create in elastic
    // return await this._elasticCollectionRepository.upsertCollection(id, collection);
  }

  /**
   * @param {string} id
   * @param {!Object} collection
   * @return {Object}
   */
  async update(id, collection) {
    // Update in the db
    await this._collectionRepository.updateCollection(id, collection);

    // Update in elastic
    return await this._elasticCollectionRepository.upsertCollection(id, collection);
  }

  /**
   * @param {string} id
   * @return {Object}
   */
  async delete(id) {
    // Delete in the db
    await this._collectionRepository.deleteCollection(id);

    // Delete in elastic
    return await this._elasticCollectionRepository.removeCollection(id);
  }

  /**
   * @param {string} id
   * @param {{ destination: string | number }} body
   * @return {Object}
   */
  async addAnalyse(id, body) {
    // Extract properties
    const { destination: analyzeId } = body;

    // Create relation in the db
    return await this._collectionRepository.addAnalyse(id, analyzeId);
  }

  /**
   * @param {string} id
   * @return {Object}
   */
  async getAnalyses(id) {
    return await this._collectionRepository.getAnalyses(id);
  }
}

// Initialize collection service
export const collection = new Collection({
  collectionRepository: collectionRepository,
  elasticCollectionRepository: elasticCollectionRepository
});
