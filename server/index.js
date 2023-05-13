import { neo4j } from './neo4j/index.js';
import { elastic } from './elastic/index.js';
import { server } from './server/index.js';

// Start Neo4j connection
await neo4j.init();

// Start Elastic connection
await elastic.init();

// Start Server
await server.init();
