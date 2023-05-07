import { collection as collectionRepository } from '../data/repositories/repositories.js';
import { Collection } from './collection/collection.service.js';

const collection = new Collection({
    collectionRepository: collectionRepository
});

export { collection };
