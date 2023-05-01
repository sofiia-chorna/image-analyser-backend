import { Abstract as AbstractModel } from '../abstract/abstract.model.js';

export class Collection extends AbstractModel {
  static get jsonSchema() {
    const baseSchema = super.jsonSchema;
    return {
      type: baseSchema.type,
      properties: {
        ...baseSchema.properties,
      }
    };
  }

  // TODO
  static get relationMappings() {
    return {};
  }
}
