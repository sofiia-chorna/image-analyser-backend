import Joi from 'joi';
import {
  CollectionValidationMessage,
  CollectionValidationRule,
  CollectionPayloadKey
} from '../../common/enums/enums.js';

export const collection = Joi.object({
  [CollectionPayloadKey.NAME]: Joi.string()
    .trim()
    .min(CollectionValidationRule.NAME_MIN_LENGTH)
    .max(CollectionValidationRule.NAME_MAX_LENGTH)
    .required()
    .messages({
      'string.min': CollectionValidationMessage.NAME_MIN_LENGTH,
      'string.max': CollectionValidationMessage.NAME_MAX_LENGTH,
      'string.empty': CollectionValidationMessage.NAME_REQUIRE
    }),
  [CollectionPayloadKey.DESCRIPTION]: Joi.string()
    .trim()
    .min(CollectionValidationRule.DESCRIPTION_MIN_LENGTH)
    .max(CollectionValidationRule.DESCRIPTION_MAX_LENGTH)
    .required()
    .messages({
      'string.min': CollectionValidationMessage.DESCRIPTION_MIN_LENGTH,
      'string.max': CollectionValidationMessage.DESCRIPTION_MAX_LENGTH,
      'string.empty': CollectionValidationMessage.DESCRIPTION_REQUIRE
    })
});
