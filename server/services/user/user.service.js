import { user as userRepository } from '../../data/repositories/repositories.js';

/**
 * User service helper class
 */
class User {
  /**
   * @param {!Object} params
   * @return {User}
   */
  constructor(params) {
    // Get repositories from params
    const { userRepository } = params;

    /**
     * @private
     * @type {function(*)}
     */
    this._userRepository = userRepository;
  }

  /**
   * @param {!Object} filter
   * @return {!Array<!Object>}
   */
  getAll(filter) {
    return this._userRepository.getUsers(filter);
  }

  /**
   * @param {string} id
   * @return {Object}
   */
  getById(id) {
    return this._userRepository.getUserById(id);
  }

  /**
   * @param {!Object} user
   * @return {Object}
   */
  async insert(user) {
    return await this._userRepository.insertUser(user);
    // TODO insert to elastic search
  }

  /**
   * @param {string} id
   * @param {!Object} user
   * @return {Object}
   */
  async update(id, user) {
    return await this._userRepository.updateUser(id, user);
    // TODO update to elastic search
  }

  /**
   * @param {string} id
   * @return {Object}
   */
  async delete(id) {
    return this._userRepository.deleteUser(id);
  }

  // TODO Elastic Search method

  /**
   * @param {{ origin: string | number, destination: string | number }} body
   * @return {Object}
   */
  async addAnalyse(body) {
    // Extract properties
    const { origin: id, destination: analyzeId } = body;

    // Create relation in the db
    return await this._userRepository.addAnalyse(id, analyzeId);
  }

  /**
   * @param {{ origin: string | number, destination: string | number }} body
   * @return {Object}
   */
  async addCollection(body) {
    // Extract properties
    const { origin: id, destination: collectionId } = body;

    // Create relation in the db
    return await this._userRepository.addCollection(id, collectionId);
  }
}

// Initialize user service
export const user = new User({
  userRepository: userRepository
});
