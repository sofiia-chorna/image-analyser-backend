import neo4j from 'neo4j-driver';
import { ENV } from '../common/common.js';
import { getDateLog } from '../helpers/helpers.js';

export class Neo4j {
    /**
     * @param {{debug: boolean}=} params
     * @return {!Neo4j}
     */
    constructor(params = {}) {
        /**
         * @private
         * @type {import('neo4j-driver').Driver}
         */
        this.driver = null;

        /**
         * @private
         * @constant
         * @type {import('neo4j-driver').auth}
         */
        this.auth = neo4j.auth.basic(ENV.NEO4J.USER, ENV.NEO4J.PASSWORD);

        /**
         * @private
         * @constant
         * @type {string}
         */
        this.URI = ENV.NEO4J.URI;

        /**
         * @private
         * @constant
         * @type {boolean}
         */
        this.debug = !!params.debug;
    };

    /**
     * @return {!Promise<void>}
     */
    async init() {
        try {
            console.log('Try starting neo4j');

            // Init neo4j driver
            this.driver = neo4j.driver(this.URI, this.auth);

            // Verify connection
            await this.testConnection();
        }
        // Connection error
        catch(error) {
            console.log(error);
        }
    }

    /**
     * @return {!Promise<void>}
     */
    async testConnection() {
        const serverInfo = await this.driver.verifyConnectivity();
        console.log(`Connection established: ${JSON.stringify(serverInfo)}`);
    }

    /**
     * @return {import('neo4j-driver').session}
     */
    getSession() {
        return this.driver.session({ database: 'neo4j' });
    }

    /**
     * @param {string} readQuery
     * @param {Object=} variables
     * @return {!Promise<Array<!Object>>}
     */
    async read(readQuery, variables = {}) {
        // Get current session
        const session = this.getSession();

        // Execute read transaction
        try {
            // Replace query parameters with variables
            const { summary, records } = await session.executeRead(tx =>
                tx.run(readQuery, variables)
            );

            // Log query
            if (this.debug) {
                const date = getDateLog();
                console.log(`[${date}] cypher query: ${JSON.stringify(summary.query, null, 4)}`);
            }

            // Convert result to meaningful objects
            return this.formatRecords(records);
        }
        // Error while executing transaction
        catch (error) {
            console.error(error);
        }
        // Close session
        finally {
            await session.close();
        }
    }

    /**
     * @param {string} writeQuery
     * @param {Object=} variables
     * @return {!Promise<Array<!Object>>}
     */
    async write(writeQuery, variables = {}) {
        // Get current session
        const session = this.getSession();

        // Execute write transaction
        try {
            // Replace query parameters with variables
            const { summary, records } = await session.executeWrite(tx =>
                tx.run(writeQuery, variables)
            );

            // Log query
            if (this.debug) {
                const date = getDateLog();
                console.log(`[${date}] cypher query: ${JSON.stringify(summary.query, null, 4)}`);
            }

            // Convert result to meaningful objects
            return this.formatRecords(records);
        }
        // Error while executing transaction
        catch (error) {
            console.error(error);
        }
        // Close session
        finally {
            await session.close();
        }
    }

    /**
     * @return {!Promise<void>}
     */
    async close() {
        await this.driver.close();
    }

    // TODO factorize to class to expose record methods
    /**
     * @param {!Array<!Object>} records
     * @return {!Array<!Object>}
     */
    formatRecords(records) {
        // Eliminate nested arrays
        return records.flatMap(record => {
            // Convert records to json
            return record.map(node => {
                // Get meaningfull properties
                return {
                    ...node.properties,
                    id: node.identity.toString(),
                };
            });
        });
    }
}
