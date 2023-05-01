import { neo4jClient } from './neo4j/neo4j.js';
import { serverClient } from './server/server.js';

// Start Neo4j connection
await neo4jClient.init();

// Start Server
await serverClient.init();
