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
   * @return {!Promise<!Array<!Object>>}
   */
  async getCollections() {
    return await this.getAll();
  }

  /**
   * @private
   * @param {string} id
   * @return {!Promise<Object>}
   */
  async getCollectionById(id) {
    return await this.getById(id);
  }

  /**
   * @private
   * @param {Object} collection
   * @return {!Promise<Object>}
   */
  async insertCollection(collection) {
    return await this.create(collection);
  }

  /**
   * @private
   * @param {string} id
   * @param {Object} collection
   * @return {!Promise<Object>}
   */
  async updateCollection(id, collection) {
    return await this.updateById(id, collection);
  }

  /**
   * @private
   * @param {string} id
   * @return {!Promise<Object>}
   */
  async deleteCollection(id) {
    return await this.deleteById(id);
  }

  /**
   * @private
   * @param {string | number} id
   * @param {string | number} analyzeId
   * @return {!Promise<Object>}
   */
  async addAnalyse(id, analyzeId) {
    return await this.createRelation(this.model.analyseRel, id, analyzeId);
  }

  /**
   * @private
   * @param {string | number} id
   * @return {!Promise<!Array<!Object>>}
   */
  async getAnalyses(id){
    return await this.followRelation(this.model.analyseRel, id);
  }

}

// Initialize collection repo
export const collection = new Collection({
  collectionModel: CollectionModel
});
