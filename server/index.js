const express = require('express');
const { ApolloServer} = require('apollo-server-express');
const cors = require('cors');

const resolvers = require('./resolvers');
const typeDefs = require('./schema');

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
app.use(cors);
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);