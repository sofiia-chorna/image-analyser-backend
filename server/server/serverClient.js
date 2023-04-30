import fastify from 'fastify';
import cors from 'fastify-cors';
import { ENV, ExitCode } from '../common/enums.js';
import { initApi } from '../api/api.js';

class ServerClient {
    /**
     * @return {ServerClient}
     */
    constructor() {
        /**
         * @private
         * @type {import('fastify').FastifyServer}
         */
        this.server = null;

        /**
         * @private
         * @type {!Map<string, !Object>}
         */
        this.routes = new Map();

        // Init the server
        this.init();
    }

    /**
     * Init the fastify server logic
     * @private
     */
    async init() {
        // Close previous connection if any
        await this.stopServer();

        // Create a new server
        await this.createServer();

        // Add the routes
        this.registerRoutes();

        // Start the server
        await this.startServer();
    }

    /**
     * @private
     * @return {!Promise<void>}
     */
    async stopServer() {
        if (!!this.server) {
            console.info('Try closing the server');
            await this.server.close();
            console.info('Server has been closed');
        }
        this.server = null;
    }

    /**
     * @private
     */
    createServer() {
        // TODO add comments
        this.server = fastify({
            logger: {
                prettyPrint: {
                    ignore: 'pid,hostname'
                }
            }
        });
        this.server.addContentTypeParser('*', {'parseAs': 'buffer'}, (_request, body, done) => {
            done(null, body);
        });
        this.server.register(cors);
    }

    /**
     * @private
     */
    registerRoutes() {
        this.server.register(initApi, {
            // TODO add services once created
            services: {},
            prefix: ENV.APP.API_PATH
        });
    }

    /**
     * @private
     * @return {!Promise<void>}
     */
    async startServer() {
        try {
            // Get port and host as environmental variables or use the default one
            const port = ENV.APP.PORT ?? 80;
            const host = ENV.APP.HOST ?? '0.0.0.0';

            // Start the server
            console.info('Try starting the server');
            await this.server.listen(port, host);
            console.info(`Listening on ${host}:${port}`);
        }
        // Connection error
        catch (err) {
            this.server.log.error(err);
            process.exit(ExitCode.ERROR);
        }
    }
}

// Export as a singleton function
let instance = null;
export default () => {
    if (instance === null) {
        instance = new ServerClient();
    }
    return instance;
}
