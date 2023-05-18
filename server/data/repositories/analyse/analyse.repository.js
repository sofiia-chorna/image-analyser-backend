import { Abstract } from '../abstract/abstract.repository.js';
import { Analyse as AnalyseModel } from '../../models/models.js';

export class Analyse extends Abstract {
  /**
   * @return {Analyse}
   */
  constructor({ analyseModel }) {
    super(analyseModel);
  }

  /**
   * @private
   * @return {!Promise<!Array<!Object>>}
   */
  async getAnalyses() {
    return await this.getAll();
  }

  /**
   * @private
   * @param {string} id
   * @return {!Promise<Object>}
   */
  async getAnalyseById(id) {
    return await this.getById(id);
  }

  /**
   * @private
   * @param {Object} analyse
   * @return {!Promise<Object>}
   */
  async insertAnalyse(analyse) {
    return await this.create(analyse);
  }

  /**
   * @private
   * @param {string} id
   * @param {Object} analyse
   * @return {!Promise<Object>}
   */
  async updateAnalyse(id, analyse) {
    return await this.updateById(id, analyse);
  }

  /**
   * @private
   * @param {string} id
   * @return {!Promise<Object>}
   */
  async deleteAnalyse(id) {
    return await this.deleteById(id);
  }
}

// Initialize analyse repo
export const analyse = new Analyse({
  analyseModel: AnalyseModel
});
