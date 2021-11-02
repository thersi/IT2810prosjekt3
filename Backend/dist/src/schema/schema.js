"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Movie = require('../model').Movie;
var apollo_server_1 = require("apollo-server");
var schema_1 = require("@graphql-tools/schema");
// The GraphQl resolvers
var resolvers = {
    // Resolvers for the queries
    Query: {
        /**
         * Finds and returns the search result based on the inputs. Also returning number of elements found
         *
         * @param filterGenre a string with a genre-name, empty string if return all genres
         * @param limit number - Number of movies per page. Must be 1 or larger
         * @param page number - The page number. Must be 1 or larger.
         * @param order number - If -1 descending order, else increasing order.
         * @param sortOn string - if 'year' sort on year, else sort on title.
         * @param word string - The word to filter on, returns all movies if empty.
         */
        searchAndFilter: function (_, _a) {
            var filterGenre = _a.filterGenre, limit = _a.limit, page = _a.page, order = _a.order, sortOn = _a.sortOn, word = _a.word;
            // set pagination and ordering variables
            var skips = limit * (Number(page) - 1);
            var orderNum;
            if (order != 1 && order != -1) {
                orderNum = 1; //default sort ASC if bad input
            }
            else {
                orderNum = order;
            }
            var movies = new Promise(function (resolve, reject) {
                // find all documents where title and genre values matches regular expression
                // using params word and filterGenre
                var result = Movie.find({ title: { $regex: word, $options: '$i' }, genre: { $regex: filterGenre, $options: '$i' } }, function (err, movies) {
                    if (err)
                        reject(err);
                    else
                        resolve(movies);
                });
                if (sortOn === 'year') {
                    result.sort({ "year": orderNum }).skip(skips).limit(limit);
                }
                else {
                    // default sorting-attribute is title
                    result.sort({ "title": orderNum }).skip(skips).limit(limit);
                }
            });
            var count = new Promise(function (resolve, reject) {
                // count the number of documents matching the params
                Movie.count({ title: { $regex: word, $options: '$i' }, genre: { $regex: filterGenre, $options: '$i' } }, function (err, movie) {
                    if (err)
                        reject(err);
                    else
                        resolve(movie);
                });
            });
            return {
                movies: movies,
                pages: count
            };
        },
        /**
         * Finds a single movie by id.
         *
         * @param id string - the movieId
         */
        movieById: function (_, _a) {
            var id = _a.id;
            return new Promise(function (resolve, reject) {
                Movie.findOne({ _id: id }, function (err, movie) {
                    if (err)
                        reject(err);
                    else
                        resolve(movie);
                });
            });
        },
    },
    // Resolvers for the mutations
    Mutation: {
        /**
         * Increases the thumbsUp count of a movie.
         *
         * @param id string - the movieId
         */
        thumbsUpById: function (_, _a) {
            var id = _a.id;
            return new Promise(function (resolve, reject) {
                Movie.findOneAndUpdate({ _id: id }, { $inc: { thumbsUp: 1 } }, { new: true }, function (err, movie) {
                    if (err)
                        reject(err);
                    else
                        resolve(movie);
                });
            });
        },
        /**
         * Increases the thumbsDown count of a movie.
         *
         * @param id string - the movieId
         */
        thumbsDownById: function (_, _a) {
            var id = _a.id;
            return new Promise(function (resolve, reject) {
                Movie.findOneAndUpdate({ _id: id }, { $inc: { thumbsDown: 1 } }, { new: true }, function (err, movie) {
                    if (err)
                        reject(err);
                    else
                        resolve(movie);
                });
            });
        }
    }
};
// The GraphQL Type-definition
var typeDefs = (0, apollo_server_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    \n    # Movie Type\n    type Movie {\n        _id: ID!\n        title: String!\n        thumbsUp: Int!\n        year: Int!\n        genre: [String!]!\n        actors: [String!]\n        thumbsDown: Int!\n        poster: String!\n    }\n\n    # type for the result of the searchAndFilter-query\n    type SearchResult {\n        movies: [Movie!]\n        pages: Int!\n    }\n\n    # type of queries\n    type Query {\n        movieById(id: ID!): Movie\n        searchAndFilter(filterGenre: String! limit: Int! page: Int! order: Int!, sortOn: String! word: String!): SearchResult!\n    }\n\n    # type of mutations\n    type Mutation {\n       thumbsUpById(id: ID!): Movie\n       thumbsDownById(id: ID!): Movie\n    }\n"], ["\n    \n    # Movie Type\n    type Movie {\n        _id: ID!\n        title: String!\n        thumbsUp: Int!\n        year: Int!\n        genre: [String!]!\n        actors: [String!]\n        thumbsDown: Int!\n        poster: String!\n    }\n\n    # type for the result of the searchAndFilter-query\n    type SearchResult {\n        movies: [Movie!]\n        pages: Int!\n    }\n\n    # type of queries\n    type Query {\n        movieById(id: ID!): Movie\n        searchAndFilter(filterGenre: String! limit: Int! page: Int! order: Int!, sortOn: String! word: String!): SearchResult!\n    }\n\n    # type of mutations\n    type Mutation {\n       thumbsUpById(id: ID!): Movie\n       thumbsDownById(id: ID!): Movie\n    }\n"
    /* Make and export executable schema consisting of the
       typedefs and resolvers. To be used by the apollo-server
     */
])));
/* Make and export executable schema consisting of the
   typedefs and resolvers. To be used by the apollo-server
 */
var schema = (0, schema_1.makeExecutableSchema)({
    typeDefs: typeDefs,
    resolvers: resolvers,
});
exports.default = (schema);
var templateObject_1;
