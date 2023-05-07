import { Abstract } from '../abstract/abstract.repository.js';

export class Collection extends Abstract {
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
   * @param {Object} collection
   * @return {Object}
   */
  async updateCollection(collection) {
    // TODO
    return null;
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
