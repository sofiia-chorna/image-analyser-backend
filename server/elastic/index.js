import { Elastic } from './elastic.js';
import { DATA_TYPE } from '../common/common.js';

/*
 Elastic search indexes
*/
const indexes = new Set([
    DATA_TYPE.ANALYSE,
    DATA_TYPE.COLLECTION
]);

/**
 * Controller singleton
 */
export const elastic = new Elastic({
    indexes: indexes
});
