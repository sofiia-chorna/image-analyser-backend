import { Collection as CollectionModel } from '../models/models.js';
import { Collection } from './collection/collection.repository.js';

const collection = new Collection({
    collectionModel: CollectionModel
});

export { collection };
