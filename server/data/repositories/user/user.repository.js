import { Abstract } from '../abstract/abstract.repository.js';
import { User as UserModel } from '../../models/models.js';

export class User extends Abstract {
  /**
   * @return {User}
   */
  constructor({ userModel }) {
    super(userModel);
  }

  /**
   * @private
   * @return {!Promise<!Array<!Object>>}
   */
  async getUsers() {
    return await this.getAll();
  }

  /**
   * @private
   * @param {string} id
   * @return {!Promise<Object>}
   */
  async getUserById(id) {
    return await this.getById(id);
  }

  /**
   * @private
   * @param {Object} user
   * @return {!Promise<Object>}
   */
  async insertUser(user) {
    return await this.create(user);
  }

  /**
   * @private
   * @param {string} id
   * @param {Object} user
   * @return {!Promise<Object>}
   */
  async updateUser(id, user) {
    return await this.updateById(id, user);
  }

  /**
   * @private
   * @param {string} id
   * @return {!Promise<Object>}
   */
  async deleteUser(id) {
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
   * @param {string | number} collectionId
   * @return {!Promise<Object>}
   */
  async addCollection(id, collectionId) {
    return await this.createRelation(this.model.collectionRel, id, collectionId);
  }
}


// Initialize user repo
export const user = new User({
  userModel: UserModel
});
