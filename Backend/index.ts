const { ApolloServer } = require("apollo-server");
import schema from './src/schema/schema'
import mongoose from 'mongoose'

const server = new ApolloServer({ schema });

mongoose.connect(
    "mongodb://admin:passord@it2810-37.idi.ntnu.no:27017/it2810?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
).then(() => {
    console.log("database connected");
    server.listen().then((url: any) => {
        console.log(`Apollo server is running at: ${url.url} `)
    });
}).catch((err: any) => {
    console.log(err);
    console.log("could not connect to database");
});

let db = mongoose.connection;

db.on('error', () => {
    console.error("Error while connecting to DB");
});




