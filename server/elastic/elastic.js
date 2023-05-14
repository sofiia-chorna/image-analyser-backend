import { Client } from '@elastic/elasticsearch';
import * as uuid from 'uuid';
import { ENV } from '../common/common.js';

export class Elastic {
    /**
     * @param {{indexes: Set<string>=}} params
     * @return {!Elastic}
     */
    constructor(params = {}) {
        /**
         * @private
         * @constant
         * @type {string}
         */
        this.cloudId = ENV.ELASTIC.CLOUD_ID;

        /**
         * @private
         * @constant
         * @type {!Object}
         */
        this.auth = { username: ENV.ELASTIC.USERNAME, password: ENV.ELASTIC.PASSWORD };

        /**
         * @private
         * @constant
         * @type {Set<string>}
         */
        this.indexes = params.indexes ?? new Set();
    }

    /**
     * @return {!Promise<void>}
     */
    async init() {
        try {
            // Init elastic search driver
            console.info('Try starting the elastic search');
            this.client = new Client({
                cloud: { id: this.cloudId },
                auth: this.auth
            });

            // Delete already created indexes
            await this.destroyIndexes();

            // Verify connection
            await this.testConnection();
        }
        // Connection error
        catch (error) {
            console.log(error);
        }
    }

    /**
     * @return {!Promise<void>}
     */
    async testConnection() {
        try {
            const serverInfo = await this.client.info({
                human: true,
                pretty: true,
                filter_path: ['name', 'cluster_name', 'cluster_uuid', 'version.build_type', 'version.build_hash', 'version.build_date', 'version.build_snapshot']
            });
            console.log(`Connection established: ${JSON.stringify(serverInfo)}`);
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * @param {string} index
     * @return {!Promise<boolean>}
     */
    async exists(index) {
        return await this.client.indices.exists({ index: index });
    }

    /**
     * @param {string} index
     * @param {BooleanQuery} query
     * @return {!Promise<Array<Object>>}
     */
    async search(index, query) {
        const { hits } = await this.client.search({
            index: index,
            query: query ?? { match_all: {} },
        });
        return hits.hits;
    }

    /**
     * @param {string} index
     * @param {string} id
     * @return {!Promise<Object>}
     */
    async getById(index, id) {
        return await this.client.get({
            index: index,
            id: id
        })
    }

    /**
     * @param {string} index
     * @param {Object} body
     * @return {!Promise<string | null>}
     */
    async index(index, body) {
        const { _id } = await this.client.index({
            index: index,
            body: {
                id: uuid.v4(),
                ...body
            }
        });
        return _id;
    }

    /**
     * @param {string} index
     * @param {string} id
     * @param {Object} body
     * @return {!Promise<Array<Object>>}
     */
    async update(index, id, body) {
        try {
            const { result } = await this.client.update({
                index: index,
                id: id,
                body: body
            });
            return result;
        } catch (err) {
            return null;
        }
    }

    /**
     * @param {string} index
     * @param {string} id
     * @return {!Promise<string | null>}
     */
    async remove(index, id) {
        try {
            const { result } = await this.client.delete({
                index: index,
                id: id
            });
            return result;
        } catch (err) {
            return null;
        }
    }

    /**
     * @return {!Promise<void>}
     */
    async destroyIndexes() {
        for (const index of Array.from(this.indexes)) {
            await this.destroyIndex(index);
        }
    }

    /**
     * @param {string} index
     * @return {!Promise<void>}
     */
    async destroyIndex(index) {
        const exists = await this.exists(index);
        if (!exists) {
            return;
        }
        await this.client.indices.delete({ index: index });
    }
}

/**
 * @typedef {import('@elastic/elasticsearch').BooleanQuery} BooleanQuery
 */
