import { Abstract as AbstractModel } from '../abstract/abstract.model.js';
import { TYPE, DATA_TYPE } from '../../../common/common.js';

export class Collection extends AbstractModel {
  constructor() {
    super(DATA_TYPE.COLLECTION);

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
        name: { type: 'string' },
      }
    };
  }

  // TODO
  static get relationMappings() {
    return {};
  }
}
