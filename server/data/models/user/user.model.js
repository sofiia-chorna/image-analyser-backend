import { Abstract as AbstractModel } from '../abstract/abstract.model.js';
import { TYPE, DATA_TYPE } from '../../../common/common.js';
import { Relation } from '../../../neo4j/index.js';

export class User extends AbstractModel {
  constructor() {
    super(DATA_TYPE.USER);

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

    /**
     * @protected
     * @type {Relation}
     */
    this.collectionRel = new Relation({ origin: this.getLabel(), destination: DATA_TYPE.COLLECTION });
  }

  static get jsonSchema() {
    const baseSchema = super.jsonSchema;
    return {
      properties: {
        ...baseSchema.properties,
        fullname: { type: 'string' },
        email: { type: 'string' },
        occupation: { type: 'string' }
      }
    };
  }

  // TODO
  static get relationMappings() {
    return {};
  }
}
