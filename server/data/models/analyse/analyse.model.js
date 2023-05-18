import { Abstract as AbstractModel } from '../abstract/abstract.model.js';
import { TYPE, DATA_TYPE } from '../../../common/common.js';

export class Analyse extends AbstractModel {
  constructor() {
    super(DATA_TYPE.ANALYSE);

    /**
     * @protected
     * @type {string}
     */
    this.type = TYPE.NODE;
  }

  static get jsonSchema() {
    const baseSchema = super.jsonSchema;
    return {
      properties: {
        ...baseSchema.properties,
        score: { type: 'number' },
        createdAt: { type: 'number' },
        labels: { type: 'array' },
        image: { type: 'string' }
      }
    };
  }

  // TODO
  static get relationMappings() {
    return {};
  }
}
