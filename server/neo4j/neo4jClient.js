import neo4j from 'neo4j-driver';
import * as dotenv from 'dotenv';

// Configure reading from .env
dotenv.config();

// TODO debug mode to log response details
class Neo4jClient {
    constructor() {
        /**
         * @private
         * @constant
         * @type {import('neo4j-driver').auth}
         */
        this.auth = neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD);

        /**
         * @private
         * @constant
         * @type {string}
         */
        this.URI = process.env.NEO4J_URI;
    };

    async init() {
        try {
            /**
             * @private
             * @constant
             * @type {import('neo4j-driver').Driver}
             */
            this.driver = neo4j.driver(this.URI, this.auth);

            // Verify connection
            await this.testConnection();
        }
        // Connection error
        catch(error) {
            console.log(error);
        }
    }

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
     * @param {Object} variables
     * @return {Array<!Object>}
     */
    async read(readQuery, variables) {
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
     * @param {Object} variables
     * @return {Array<!Object>}
     */
    async write(writeQuery, variables) {
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

    async close() {
        await this.driver.close();
    }
}

// Singleton instance
export const neo4jClient = new Neo4jClient();
await neo4jClient.init();
