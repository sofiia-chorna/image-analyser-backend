import fastify from 'fastify';
import cors from '@fastify/cors';
import { ENV, ExitCode } from '../common/common.js';
import { initApi } from '../api/api.js';
import { collection, user, analyse } from '../services/services.js';

class Server {
    /**
     * @return {Server}
     */
    constructor() {
        /**
         * @private
         * @type {import('fastify').FastifyServer}
         */
        this.server = null;

        /**
         * @private
         * @constant
         * @type {number}
         */
        this.PORT = ENV.APP.PORT ?? 80;

        /**
         * @private
         * @constant
         * @type {string}
         */
        this.HOST = ENV.APP.HOST ?? '0.0.0.0';
    }

    /**
     * Init the fastify server logic
     * @return {!Promise<void>}
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
                transport: {
                    target: 'pino-pretty',
                    options: {
                        colorize: false,
                        singleLine: true,
                        ignore: 'pid,req.hostname,req.remotePort'
                    }
                },
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
            services: {
                collection: collection,
                user: user,
                analyse: analyse,
            },
            prefix: ENV.APP.API_PATH
        });
    }

    /**
     * @private
     * @return {!Promise<void>}
     */
    async startServer() {
        try {
            // Start the server
            console.info('Try starting the server');
            await this.server.listen({ port: this.PORT, address: this.HOST });
        }
            // Connection error
        catch (error) {
            this.server.log.error(error);
            process.exit(ExitCode.ERROR);
        }
    }
}

// Singleton instance
export const serverClient = new Server();
