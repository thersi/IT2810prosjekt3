const { ApolloServer } = require("apollo-server");
const { resolvers } = require("./schema/resolvers.ts");
const { types } = require("./schema/type-defs.ts");
const mongoose = require('mongoose');


const server = new ApolloServer({
    typeDefs: types, resolvers });

mongoose.connect(
    "mongodb://it2810:passord@it2810-37.idi.ntnu.no:27017/?authSource=moviedb"
    ).then( () => {
        console.log("database connected");
        server.listen().then((url:any) => {
            console.log(`Apollo server is running at: ${url.url} `)
        });
    }).catch((err: any) => {
        console.log(err);
        console.log("could not connect to database");
    });

