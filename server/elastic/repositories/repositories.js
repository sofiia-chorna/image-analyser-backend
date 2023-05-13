import { elastic } from '../index.js';
import { Collection } from './collection/collection.js';

export const collection = new Collection({
    elastic: elastic
});

