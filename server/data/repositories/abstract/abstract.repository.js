import { neo4j, Relation } from '../../../neo4j/index.js';

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
    this.neo4j = neo4j;
  }

  /**
   * @return {string}
   */
  getLabel() {
    return this.model.getLabel();
  }

  /**
   * @private
   * @return {!Promise<!Array<!Object>>}
   */
  async getAll() {
    const label = this.getLabel();
    const query = `MATCH (n:${label}) RETURN n`;
    return await this.neo4j.read(query);
  }

  /**
   * @private
   * @param {string} id
   * @return {!Promise<Object>}
   */
  async getById(id) {
    const label = this.getLabel();
    const query = `MATCH (n:${label}) WHERE id(n) = $id RETURN n`;
    const records = await this.neo4j.read(query, { id: Number(id) });
    return records ? records[0] : null;
  }

  /**
   * @private
   * @param {!Object} data
   * @return {!Promise<Object>}
   */
  async create(data) {
    const label = this.getLabel();
    const query = `CREATE (n:${label}) SET n = $props RETURN n`;
    const responses = await this.neo4j.write(query, { props: data });
    return responses ? responses[0] : null;
    // TODO create QueryResult to expose neo4j response info
    //  return response.getFirst()
  }

  /**
   * @private
   * @param {string} id
   * @param {!Object} data
   * @return {!Promise<Object>}
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
   * @return {!Promise<Object>}
   */
  async deleteById(id) {
    const label = this.getLabel();
    const query = `MATCH (n:${label}) WHERE id(n) = $id DETACH DELETE n RETURN n`;
    const records = await this.neo4j.write(query, { id: Number(id) });
    return records ? records[0] : null;
  }

  /**
   * @private
   * @param {Relation} relation
   * @param {string | number} from
   * @param {string | number} to
   * @return {!Promise<Object>}
   */
  async createRelation(relation, from, to) {
    // TODO cypher query builder class
    const query = `MATCH (origin:${relation.getOrigin()}), (destination:${relation.getDestination()}) ` +
        'WHERE id(origin) = $originId AND id(destination) = $destinationId ' +
        `CREATE (origin)-[r:${relation.getName()}]->(destination) ` +
        'RETURN r';
    return await this.neo4j.write(query, { originId: Number(from), destinationId: Number(to) });
  }

  /**
   * @private
   * @param {Relation} relation
   * @param {string | number} from
   * @return {!Promise<Object>}
   */
  async followRelation(relation, from) {
    // TODO cypher query builder class
    const query = `MATCH (origin:${relation.getOrigin()})-[:${relation.getName()}]->(destination:${relation.getDestination()}) ` +
    `WHERE id(origin) = $originId ` +
    `RETURN destination`;
    return await this.neo4j.write(query, { originId: Number(from) });
  }
}
