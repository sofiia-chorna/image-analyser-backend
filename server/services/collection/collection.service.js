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
   * @param {!Object} collection
   * @return {Object}
   */
  async insert(collection) {
    // Create in the db
   const { id } = await this._collectionRepository.insertCollection(collection);

    // Create in elastic
    return await this._elasticCollectionRepository.insertCollection({ ...collection, id: id });
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
    await this._elasticCollectionRepository.updateCollection(id, collection);

    // Done
    return result;
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
   * @param {{ origin: string | number, destination: string | number }} body
   * @return {Object}
   */
  async addAnalyses(body) {
    // Extract properties
    const { origin: id, destination: analyzeId } = body;

    // Create relation in the db
    return  await this._collectionRepository.addAnalyses(id, analyzeId);
  }
}

// Initialize collection service
export const collection = new Collection({
  collectionRepository: collectionRepository,
  elasticCollectionRepository: elasticCollectionRepository
});
