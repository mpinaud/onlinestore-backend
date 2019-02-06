# back2Front

## Order of operation from backend to index.js

### Prisma

    * datamodel.prisma
        - create the schema for database

    run: prisma deploy

    * src/generated/prisma.graphql
        - prisma deploy generates a file of API methods to query and mutate based off the schema

    * src/db.js
        - connects to the remote Prisma database and gives us the ability to query it with JS

### GraphQL Yoga
    * src/schema.graphql
        - public facing API that will be interfacing with JavaScript
    * src/resolvers
        - holds both Mutation and Query

### Server
    * src/createServer.js
        - connects to the remote Prisma DB and gives us the ability to query it with JS
