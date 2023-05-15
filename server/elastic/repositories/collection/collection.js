import { Abstract } from '../abstract/abstract.js';
import { getAsISODate, getAsJSON } from '../../../helpers/convertors/convertors.js';
import { QueryBuilder } from '../../QueryBuilder/QueryBuilder.js';

export class Collection extends Abstract {
    /**
     * @param {{elastic: !Elastic, index: string}} params
     * @return {!Elastic}
     */
    constructor(params = {}) {
        super(params);
    }

    /**
     * @param {!Object} params
     * @return {!Array<!Object>}
     */
    async searchCollections(params) {
        try {
            const { name, createdAt, tags, author, description } = params;

            // Split date input to min and max
            const { min: minDate, max: maxDate } = getAsJSON(createdAt);

            // Create a new query
            const query = new QueryBuilder()

                // Search in name field with regex
                .wildcard('name', name)

                // Search in date between dates
                .range('createdAt', getAsISODate(minDate), getAsISODate(maxDate))

                // Search in author field with match
                .match('author', author)

                // Search in description field with match
                .match('description', description)

                // Search in tags array field with match
                .match('tags', tags);

            // Call elastic search
            return this.search(query);
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * @param {!Object} body
     * @return {!Promise<Object>}
     */
    async insertCollection(body) {
        try {
            // Call elastic search: create
            return this.create(body);
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * @param {string} id
     * @param {!Object} body
     * @return {!Promise<Object>}
     */
    async updateCollection(id, body) {
        try {
            // Call elastic search: update
            return this.update(id, body);
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * @param {string} id
     * @return {!Promise<Object>}
     */
    async removeCollection(id) {
        try {
            // Call elastic search: remove
            return this.remove(id);
        } catch (error) {
            console.error(error);
        }
    }
}
