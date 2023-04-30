import { CollectionValidationRule } from './collection-validation-rule.enum.js';

export const CollectionValidationMessage = {
  NAME_REQUIRE: 'Title is required',
  NAME_MIN_LENGTH: `Title must be at least ${CollectionValidationRule.NAME_MIN_LENGTH} characters long`,
  NAME_MAX_LENGTH: `Title must be at most ${CollectionValidationRule.NAME_MAX_LENGTH} characters long`,
  DESCRIPTION_REQUIRE: 'Description is required',
  DESCRIPTION_MIN_LENGTH: `Description must be at least ${CollectionValidationRule.DESCRIPTION_MIN_LENGTH} characters long`,
  DESCRIPTION_MAX_LENGTH: `Description must be at most ${CollectionValidationRule.DESCRIPTION_MAX_LENGTH} characters long`
};
