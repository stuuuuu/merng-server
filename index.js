// dependencies
const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');

// relative imports
const resolvers = require('./graphql/resolvers/index');
const typeDefs = require('./graphql/typedefs');
const {MONGODB} = require('./database/config');

const PORT = process.env.port || 5000;

const pubsub = new PubSub();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({req, pubsub})
})



mongoose
    .connect(MONGODB, {useNewUrlParser:true})
    .then(() => {
        console.log('MongoDB connected!');
        // return server.listen({ port: 5000});  -> used for local port
        return server.listen({ port: PORT}); 
    })
    .then(res=>{
        console.log(`Server running at ${res.url}`);
    })
    .catch(err => {
        console.error(err);
    })


 