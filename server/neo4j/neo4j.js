import neo4j from 'neo4j-driver';
import { ENV } from '../common/common.js';

// TODO debug mode to log response details
class Neo4j {
    /**
     * @return {Neo4j}
     */
    constructor() {
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
    };

    /**
     * @return {!Promise<void>}
     */
    async init() {
        try {
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
     * @return {Array<!Object>}
     */
    async read(readQuery, variables = {}) {
        // Get current session
        const session = this.getSession();

        // Execute read transaction
        try {
            // Replace query parameters with variables
            const { records } = await session.executeRead(tx =>
                tx.run(readQuery, variables)
            );

            // TODO factorize to class to expose record methods
            // Convert record to json
            return records.map(record => record.toObject());
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
     * @return {Array<!Object>}
     */
    async write(writeQuery, variables = {}) {
        // Get current session
        const session = this.getSession();

        // Execute write transaction
        try {
            // Replace query parameters with variables
            const { records } = await session.executeWrite(tx =>
                tx.run(writeQuery, variables)
            );

            // Convert result to objects
            return records.flatMap(record => record.map(node => node.properties));
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
}

// Singleton instance
export const neo4jClient = new Neo4j();
