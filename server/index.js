const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { ApolloServer} = require('apollo-server-express');

const resolvers = require('./resolvers');
const typeDefs = require('./schema');

mongoose.connect('mongodb://localhost:27017/apollo', {useNewUrlParser: true});
const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

// enable cors
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true 
};
app.use(cors(corsOptions));

// app.use(cors);
server.applyMiddleware({ app, cors: false });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);