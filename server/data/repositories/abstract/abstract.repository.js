export class Abstract {
  /**
   * @return {Abstract}
   */
  constructor(model) {
    this.model = model;
  }

  /**
   * @private
   * @return {!Array<!Object>}
   */
  getAll() {
    // TODO
    return [];
  }

  /**
   * @private
   * @param {string} id
   * @return {Object}
   */
  getById(id) {
    // TODO
    return null;
  }

  /**
   * @private
   * @param {!Object} data
   * @return {Object}
   */
  create(data) {
    // TODO
    return null;
  }

  /**
   * @private
   * @param {string} id
   * @param {!Object} data
   * @return {Object}
   */
  updateById(id, data) {
    // TODO
    return null;
  }

  /**
   * @private
   * @param {string} id
   * @return {Object}
   */
  deleteById(id) {
    // TODO
    return null;
  }
}
