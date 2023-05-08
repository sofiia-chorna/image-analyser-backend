import { neo4jClient } from '../../../neo4j/neo4j.js';

export class Abstract {
  /**
   * @param {Class} model
   * @return {Abstract}
   */
  constructor(model) {
    /**
     * @protected
     * @type {*}
     */
    this.model = new model();

    /**
     * @protected
     * @type {Neo4j}
     */
    this.neo4j = neo4jClient;
  }

  /**
   * @return {string}
   */
  getLabel() {
    return this.model.getLabel();
  }

  /**
   * @private
   * @return {Promise<!Array<!Object>>}
   */
  async getAll() {
    const label = this.getLabel();
    const query = `MATCH (n:${label}) RETURN n`;
    return await this.neo4j.read(query);
  }

  /**
   * @private
   * @param {string} id
   * @return {Promise<Object>}
   */
  async getById(id) {
    const label = this.getLabel();
    const query = `MATCH (n:${label}) WHERE id(n) = $id RETURN n`;
    const records = await this.neo4j.read(query, { id: Number(id) });
    return records[0] ?? null;
  }

  /**
   * @private
   * @return {Promise<Object>}
   */
  async create() {
    const label = this.getLabel();
    const query = `CREATE (n:${label}) RETURN n`;
    return await this.neo4j.write(query);
  }

  /**
   * @private
   * @param {string} id
   * @param {!Object} data
   * @return {Object}
   */
  async updateById(id, data) {
    // Exclude the 'id' property from the updated object
    const { id: excludedId, ...props } = data;
    const label = this.getLabel();
    const query = `MATCH (n:${label}) WHERE id(n) = $id SET n += $props RETURN n`;
    return await this.neo4j.write(query, { id: Number(id), props: props });
  }

  /**
   * @private
   * @param {string} id
   * @return {Object}
   */
  async deleteById(id) {
    const label = this.getLabel();
    const query = `MATCH (n:${label}) WHERE id(n) = $id DELETE n RETURN n`;
    const records = await this.neo4j.write(query, { id: Number(id) });
    return records[0] ?? null;
  }
}
