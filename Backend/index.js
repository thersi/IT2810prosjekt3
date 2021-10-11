const { ApolloServer } = require("apollo-server");

const server = new ApolloServer({ typeDef, resolvers });

server.listen().then((url) => {
    console.log(`API is running at: ${url}`)
})
