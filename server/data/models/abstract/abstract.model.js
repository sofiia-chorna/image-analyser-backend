export class Abstract {
  static get jsonSchema() {
    return {
      type: 'object',
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
    const date = new Date().toISOString();
    this.createdAt = date;
    this.updatedAt = date;
  }
   */

  /*
  * TODO
  $beforeUpdate() {
  this.updatedAt = new Date().toISOString();
  }
  */

}
