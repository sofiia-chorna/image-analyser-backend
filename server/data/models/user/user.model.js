import { Abstract as AbstractModel } from '../abstract/abstract.model.js';
import { TYPE, DATA_TYPE } from '../../../common/common.js';

export class User extends AbstractModel {
  constructor() {
    super(DATA_TYPE.USER);

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
        fullname: { type: 'string' },
        birthday: { type: 'string' },
        occupation: { type: 'string' }
      }
    };
  }

  // TODO
  static get relationMappings() {
    return {};
  }
}
