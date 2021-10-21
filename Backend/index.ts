const { ApolloServer } = require("apollo-server");
//const { resolvers } = require("./schema/resolvers.ts");
//const { typeDefs } = require("./schema/type-defs.ts");
import typeDefs from './schema/type-defs';
//import resolvers from './schema/resolvers';
import schema from './schema/resolvers'
//import defs from "./schema/type-defs";
import mongoose from 'mongoose'

const server = new ApolloServer({schema});

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


