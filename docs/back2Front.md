# back2Front

## Order of operation from backend to index.js

### Prisma

### Server
    * src/db.js
        - connects to the remote Prisma database and gives us the ability to query it with JS

    * datamodel.prisma
        - creates the schema for database

    run: prisma deploy 

    * src/generated/prisma.graphql
        - prisma deploy generates this file of API methods to query, mutate and filter based off the schema

### GraphQL Yoga
    * src/schema.graphql
        - public facing API that will be interfacing with JavaScript
    * src/resolvers
        - holds both Mutation and Query JavaScript functions that have access the to Prisma context database.

### Server
    * src/createServer.js
        - creates the GraphQL Yoga Server and passes it's schema and resolvers to PORT 4444
