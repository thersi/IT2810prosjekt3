"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
var schema_1 = __importDefault(require("./src/schema/schema"));
var mongoose_1 = __importDefault(require("mongoose"));
// Creating a server with apollo-server
var server = new apollo_server_1.ApolloServer({ schema: schema_1.default });
// Conecting the server to the MongoDB-database
mongoose_1.default.connect("mongodb://admin:passord@it2810-37.idi.ntnu.no:27017/it2810?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false").then(function () {
    console.log("database connected");
    server.listen().then(function (info) {
        console.log("Apollo server is running at: " + info.url + " ");
    });
}).catch(function (err) {
    console.log(err);
    console.log("could not connect to database");
});
var db = mongoose_1.default.connection;
db.on('error', function () {
    console.error("Error while connecting to DB");
});
