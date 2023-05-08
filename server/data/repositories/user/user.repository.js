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
   * @return {Promise<!Array<!Object>>}
   */
  async getUsers() {
    return await this.getAll();
  }

  /**
   * @private
   * @param {string} id
   * @return {Promise<Object>}
   */
  async getUserById(id) {
    return await this.getById(id);
  }

  /**
   * @private
   * @param {Object} user
   * @return {Object}
   */
  async insertUser(user) {
    if (user) {
      const label = this.getLabel();
      const query = `CREATE (n:${label} { fullname: $fullname, birthday: $birthday, occupation: $occupation }) RETURN n`;
      const { fullname, birthday, occupation } = user;
      return await this.neo4j.write(query, { fullname: fullname, birthday: birthday, occupation: occupation });
    }
    return await this.create();
  }

  /**
   * @private
   * @param {string} id
   * @param {Object} user
   * @return {Object}
   */
  async updateUser(id, user) {
    return await this.updateById(id, user);
  }

  /**
   * @private
   * @param {string} id
   * @return {Promise<Object>}
   */
  async deleteUser(id) {
    return await this.deleteById(id);
  }
}


// Initialize user repo
export const user = new User({
  userModel: UserModel
});
