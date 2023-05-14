import { elastic } from '../index.js';
import { DATA_TYPE } from '../../common/common.js';
import { Collection } from "./collection/collection.js";

export const collection = new Collection({
    index: DATA_TYPE.COLLECTION,
    elastic: elastic
});
