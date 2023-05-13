import { getAsISODate, getAsJSON } from '../../../helpers/convertors/convertors.js';
import { QueryBuilder } from '../../QueryBuilder/QueryBuilder.js';
import { DATA_TYPE, HttpCode } from '../../../common/common.js';

export class Collection {
    constructor({ elastic }) {
        /**
         * @constant
         * @type {string}
         */
        this.index = DATA_TYPE.COLLECTION;

        /**
         * @type {!ElasticClient}
         */
        this.elastic = elastic;
    }

    /**
     * @param {!Object} params
     * @return {!Array<!Object>}
     */
    async search(params) {
        try {
            const { name, createdAt, tags, author, description } = params;

            // Split date input to min and max
            const { min: minDate, max: maxDate } = getAsJSON(createdAt);

            // Create a new query
            const query = new QueryBuilder()

                // Search in name field with regex
                .regex('name', name)

                // Search in date between dates
                .range('createdAt', getAsISODate(minDate), getAsISODate(maxDate))

                // Search in author field with match
                .match('author', author)

                // Search in description field with match
                .match('description', description)

                // Search in tags array field with match
                .match('tags', tags);

            // Call elastic search
            const instances = await this.elastic.search({
                index: this.index,
                query: query
            });

            // Process result
            return instances.map(hit => ({
                ...hit._source,
                id: hit._id,
            }));
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * @param {!Object} body
     * @return {!Promise<Object>}
     */
    async create(body) {
        try {
            // Call elastic search: create
            const id = await this.elastic.index({
                index: this.index,
                query: {
                    ...body,
                    date: body.date ? new Date(body.date).toISOString() : null,
                }
            });

            // Get full instance
            const instance = await this.elastic.getById(id);

            // Map to have meaningful properties
            return { ...instance._source, id: instance._id };
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * @param {string} id
     * @param {!Object} body
     * @return {!Promise<Object>}
     */
    async update(id, body) {
        try {
            // Call elastic search: update
            const result = await this.elastic.update({
                index: this.index,
                id: id,
                body: { doc: body }
            });

            // No such instance
            if (result === null) {
                return { message: 'Not Found', code: HttpCode.NOT_FOUND };
            }

            // Already updated
            else if (result === 'noop') {
                return { message: 'No Operation' , code: HttpCode.OK };
            }

            // Updated
            return { message: 'OK' , code: HttpCode.OK };
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * @param {string} id
     * @return {!Promise<Object>}
     */
    async remove(id) {
        try {
            // Call elastic search: remove
            const result = await this.elastic.remove({
                index: this.index,
                id: id
            });

            // Instance deleted
            if (result !== null) {
                return { code: 200, message: result };
            }

            // Not found
            return { code: HttpCode.NOT_FOUND, message: 'Not Found' };
        } catch (error) {
            console.error(error);
        }
    }
}
