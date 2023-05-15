import { Abstract } from '../abstract/abstract.repository.js';
import { Collection as CollectionModel } from '../../models/models.js';

class Collection extends Abstract {
  /**
   * @return {Collection}
   */
  constructor({ collectionModel }) {
    super(collectionModel);
  }

  /**
   * @private
   * @return {Promise<!Array<!Object>>}
   */
  async getCollections() {
    return await this.getAll();
  }

  /**
   * @private
   * @param {string} id
   * @return {Promise<Object>}
   */
  async getCollectionById(id) {
    return await this.getById(id);
  }

  /**
   * @private
   * @param {Object} collection
   * @return {Object}
   */
  async insertCollection(collection) {
    return await this.create(collection);
  }

  /**
   * @private
   * @param {string} id
   * @param {Object} collection
   * @return {Object}
   */
  async updateCollection(id, collection) {
    return await this.updateById(id, collection);
  }

  /**
   * @private
   * @param {string} id
   * @return {Promise<Object>}
   */
  async deleteCollection(id) {
    return await this.deleteById(id);
  }
}

// Initialize collection repo
export const collection = new Collection({
  collectionModel: CollectionModel
});
