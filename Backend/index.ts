const { ApolloServer } = require("apollo-server");
//const { resolvers } = require("./schema/resolvers.ts");
//const { typeDefs } = require("./schema/type-defs.ts");
import typeDefs from './schema/type-defs';
//import resolvers from './schema/resolvers';
import schema from './schema/resolvers'
//import defs from "./schema/type-defs";
import mongoose from 'mongoose'
const {Movie} = require('./model')

const server = new ApolloServer({schema});

mongoose.connect(
    "mongodb://admin:passord@it2810-37.idi.ntnu.no:27017/it2810?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
    ).then( () => {
        console.log("database connected");
        server.listen().then((url:any) => {
            console.log(`Apollo server is running at: ${url.url} `)
        });
    }).catch((err: any) => {
        console.log(err);
        console.log("could not connect to database");
    }); 

let db = mongoose.connection;
console.log(db.collections);

db.on('error', () => {
    console.error("Error while connecting to DB");
});
    



