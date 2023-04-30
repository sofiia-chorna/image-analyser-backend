import { neo4jClient } from './neo4jClient.js';

async function test() {
    try {
        const person1Name = 'Alice';
        const person2Name = 'David';
        await createFriendship(neo4jClient, person1Name, person2Name);
        await findPerson(neo4jClient, person1Name);
    } catch (error) {
        console.error(`Something went wrong: ${error}`);
    } finally {
        await neo4jClient.close();
    }
}

test();

async function createFriendship (neo4jClient, person1Name, person2Name) {
    const writeQuery = `MERGE (p1:Person { name: $person1Name })
                                MERGE (p2:Person { name: $person2Name })
                                MERGE (p1)-[:KNOWS]->(p2)
                                RETURN p1, p2`;

    // Write transactions allow the driver to handle retries and transient errors.
    const writeResult = await neo4jClient.write(writeQuery, { person1Name, person2Name });
    console.log(writeResult)
}

async function findPerson(neo4jClient, personName) {
    const readQuery = `MATCH (p:Person)
                            WHERE p.name = $personName
                            RETURN p.name AS name`;

    const readResult = await neo4jClient.read(readQuery, { personName });
    console.log(readResult)
}
