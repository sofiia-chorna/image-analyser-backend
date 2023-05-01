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
   * @return {!Array<!Object>}
   */
  getCollections() {
    // TODO
    return [];
  }

  /**
   * @private
   * @param {string} id
   * @return {Object}
   */
  getCollectionById(id) {
    // TODO
    return null;
  }

  /**
   * @private
   * @param {Object} collection
   * @return {Object}
   */
  async insertCollection(collection) {
    // TODO
    return null;
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
}
