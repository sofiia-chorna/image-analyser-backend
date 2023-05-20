import { QueryBuilder } from '../../QueryBuilder/QueryBuilder.js';
import { HttpCode } from '../../../common/common.js';

/**
 * Abstract repository helper class
 */
export class Abstract {
    /**
     * @param {{elastic: !Elastic, index: string}} params
     * @return {!Elastic}
     */
    constructor(params = {}) {
        /**
         * @constant
         * @type {string}
         */
        this.index = params.index;

        /**
         * @type {!Elastic}
         */
        this.elastic = params.elastic;
    }

    /**
     * @param {!QueryBuilder} query
     * @param {{size: number}=} params
     * @return {!Array<!Object>}
     */
    async search(query, params) {
        try {
            // Call elastic search
            const instances = await this.elastic.search(this.index, query, params);

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
     * @param {!Object} query
     * @return {!Promise<Object>}
     */
    async create(query) {
        try {
            // Call elastic search: create
            const id = await this.elastic.index(this.index, query);

            // Get full instance
            const instance = await this.elastic.getById(this.index, id);

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
    async upsert(id, body) {
        try {
            // Call elastic search: update
            await this.elastic.upsert(this.index, id, { doc: body });

            // Get full instance
            const instance = await this.elastic.getById(this.index, id);

            // Map to have meaningful properties
            return { ...instance._source.doc, id: instance._id };
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
            const result = await this.elastic.update(this.index, id, { doc: body });

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
            const result = await this.elastic.remove(this.index, id);

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
