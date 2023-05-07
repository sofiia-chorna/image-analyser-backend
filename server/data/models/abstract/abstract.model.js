export class Abstract {
  /**
   * @param {string} label
   * @return {Abstract}
   */
  constructor(label) {
    /**
     * @protected
     * @type {string}
     */
    this.label = label;
  }

  /**
   * @export
   * @abstract
   * @return {string}
   */
  getLabel() {
    return this.label;
  }

  static get jsonSchema() {
    return {
      properties: {
        id: { type: 'string' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' }
      }
    };
  }

  /*
   * TODO
  $beforeInsert() {
    const log = new Date().toISOString();
    this.createdAt = log;
    this.updatedAt = log;
  }
   */

  /*
  * TODO
  $beforeUpdate() {
  this.updatedAt = new Date().toISOString();
  }
  */

}
