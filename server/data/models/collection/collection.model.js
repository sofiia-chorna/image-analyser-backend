import { Abstract as AbstractModel } from '../abstract/abstract.model.js';
import { TYPE, DATA_TYPE } from '../../../common/common.js';
import { Relation } from '../../../neo4j/index.js';

export class Collection extends AbstractModel {
  constructor() {
    super(DATA_TYPE.COLLECTION);

    /**
     * @protected
     * @type {string}
     */
    this.type = TYPE.NODE;

    // Relations

    /**
     * @protected
     * @type {Relation}
     */
    this.analyseRel = new Relation({ origin: this.getLabel(), destination: DATA_TYPE.ANALYSE });
  }

  static get jsonSchema() {
    const baseSchema = super.jsonSchema;
    return {
      properties: {
        ...baseSchema.properties,
        name: { type: 'string' },
      }
    };
  }
}
