import { analyse as analyseRepository } from '../../data/repositories/repositories.js';

/**
 * Analyse service helper class
 */
class Analyse {
  /**
   * @param {!Object} params
   * @return {Analyse}
   */
  constructor(params) {
    // Get repositories from params
    const { analyseRepository: analyseRepository } = params;

    /**
     * @private
     * @type {function(*)}
     */
    this._analyseRepository = analyseRepository;
  }

  /**
   * @param {!Object} filter
   * @return {!Array<!Object>}
   */
  getAll(filter) {
    return this._analyseRepository.getAnalyses(filter);
  }

  /**
   * @param {string} id
   * @return {Object}
   */
  getById(id) {
    return this._analyseRepository.getAnalyseById(id);
  }

  /**
   * @param {!Object} analyse
   * @return {Object}
   */
  async insert(analyse) {
    return await this._analyseRepository.insertAnalyse(analyse);
    // TODO insert to elastic search
  }

  /**
   * @param {string} id
   * @param {!Object} analyse
   * @return {Object}
   */
  async update(id, analyse) {
    return await this._analyseRepository.updateAnalyse(id, analyse);
    // TODO update to elastic search
  }

  /**
   * @param {string} id
   * @return {Object}
   */
  async delete(id) {
    return this._analyseRepository.deleteAnalyse(id);
  }

  // TODO Elastic Search method
}

// Initialize analyse service
export const analyse = new Analyse({
  analyseRepository: analyseRepository
});
