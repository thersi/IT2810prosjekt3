const { Movie, IMovie, MovieSchema } = require('../model')
const { gql } = require("apollo-server");
import { makeExecutableSchema } from '@graphql-tools/schema';


type paginationArgs = {
    page: number;
    limit: number;
  };

const resolvers = {
    Query: {
        movies: (root: any, args: paginationArgs) => {
            const page = args.page;
            const limit = args.limit;
            const skips: number = limit * (Number(page) - 1);
            
            return new Promise((resolve, reject) => {
                Movie.find((err: any, movies: unknown) => {
                    if (err) reject(err);
                    else resolve(movies);
                }).skip(skips).limit(limit);
            })
        },
        containsString: (root: any, { word }: any) => {
            return new Promise((resolve, reject) => {
                Movie.find({ title: { $regex: word, $options: '$i' } },
                    (err: any, movies: unknown) => {
                        if (err) reject(err);
                        else resolve(movies);
                    })
            })
        },

        sortedByTitleAsc: (root: any, args: paginationArgs) => {
            const page = args.page;
            const limit = args.limit;
            const skips: number = limit * (Number(page) - 1);

            return new Promise((resolve, reject) => {
                Movie.find((err: any, movies: unknown) => {
                    if (err) reject(err);
                    else resolve(movies);
                }).sort({ "title": 1 }).skip(skips).limit(limit);
            })
        },
        sortedByTitleDesc: (root: any, args: paginationArgs) => {
            const page = args.page;
            const limit = args.limit;
            const skips: number = limit * (Number(page) - 1);

            return new Promise((resolve, reject) => {
                Movie.find((err: any, movies: unknown) => {
                    if (err) reject(err);
                    else resolve(movies);
                }).sort({ "title": -1 }).skip(skips).limit(limit);
            })
        },
        sortedByYearDesc: (root: any, args: paginationArgs) => {
            const page = args.page;
            const limit = args.limit;
            const skips: number = limit * (Number(page) - 1);

            return new Promise((resolve, reject) => {
                Movie.find((err: any, movies: unknown) => {
                    if (err) reject(err);
                    else resolve(movies);
                }).sort({ "year": -1 }).skip(skips).limit(limit);
            })
        },
        sortedByYearAsc: (root: any, args: paginationArgs) => {
            const page = args.page;
            const limit = args.limit;
            const skips: number = limit * (Number(page) - 1);

            return new Promise((resolve, reject) => {
                Movie.find((err: any, movies: unknown) => {
                    if (err) reject(err);
                    else resolve(movies);
                }).sort({ "year": 1 }).skip(skips).limit(limit);
            })
        },
        movieById: (root: any, { id }: any) => {
            return new Promise((resolve, reject) => {
                Movie.findOne({ _id: id }, (err: any, movie: unknown) => {
                    if (err) reject(err);
                    else resolve(movie);
                })
            })
        },
        movieByTitle: (root: any, { title }: any) => {
            return new Promise((resolve, reject) => {
                Movie.findOne({ title: title }, (err: any, movie: unknown) => {
                    if (err) reject(err);
                    else resolve(movie);
                })
            })
        },
    },


    Mutation: { 
        thumbsUpById: (root: any, { id }: any) => {
            return new Promise((resolve, reject) => {
                Movie.findOneAndUpdate(
                    { _id: id },
                    { $inc: { thumbsUp: 1 } },
                    { new: true },
                    (err: any, movie: unknown) => {
                        if (err) reject(err);
                        else resolve(movie);
                    }
                )
            })
        },
        thumbsDownById: (root: any, { id }: any) => {
            return new Promise((resolve, reject) => {
                Movie.findOneAndUpdate(
                    { _id: id },
                    { $inc: { thumbsDown: 1 } },
                    { new: true },
                    (err: any, movie: unknown) => {
                        if (err) reject(err);
                        else resolve(movie);
                    }
                )
            })
        }
    }
}

const typeDefs = gql`

    type Movie {
        _id: ID!
        title: String!
        thumbsUp: Int!
        year: Int!
        genre: [String!]!
        actors: [String!]
        thumbsDown: Int!
        poster: String!
    }

    input paginationInput{
        limit: Int!
        offset: Int!
    }

    type Query {
        movies(limit: Int! page: Int!): [Movie!]!
        containsString(word: String!): [Movie!]!
        movieById(id: ID!): Movie
        movieByTitle(title: String!): Movie
        sortedByTitleAsc(limit: Int! page: Int!): [Movie!]!
        sortedByTitleDesc(limit: Int! page: Int!): [Movie!]!
        sortedByYearAsc(limit: Int! page: Int!): [Movie!]!
        sortedByYearDesc(limit: Int! page: Int!): [Movie!]!
    }

    type Mutation {
       thumbsUpById(id: ID!): Movie
       thumbsDownById(id: ID!): Movie
    }
`

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

export default (schema);