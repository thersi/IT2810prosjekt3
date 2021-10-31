const { Movie } = require('../model')
import { gql } from 'apollo-server'
import { makeExecutableSchema } from '@graphql-tools/schema';


type searchAndFilterArgs = {
    page: number;
    limit: number;
    word: string;
    order: number;
    sortOn: string;
    filterGenre: string;
};

type byIdArgs = {
    id: string
}

const resolvers = {
    Query: {
        searchAndFilter: (root: any, { filterGenre, limit, page, order, sortOn, word }: searchAndFilterArgs) => {
            const skips: number = limit * (Number(page) - 1);
            let orderNum: number;
            if (order != 1 && order != -1) {
                orderNum = 1 //default sort ASC if bad input
            }
            else {
                orderNum = order;
            }
            return new Promise((resolve, reject) => {
                let result = Movie.find({ title: { $regex: word, $options: '$i' }, genre: { $regex: filterGenre, $options: '$i' } },
                    (err: any, movies: unknown) => {
                        if (err) reject(err);
                        else resolve(movies);
                    });
                if (sortOn === 'year') {
                    result.sort({ "year": orderNum }).skip(skips).limit(limit)
                } else {
                    result.sort({ "title": orderNum }).skip(skips).limit(limit)
                }
            })
        },

        movieById: (root: any, { id }: byIdArgs) => {
            return new Promise((resolve, reject) => {
                Movie.findOne({ _id: id }, (err: any, movie: unknown) => {
                    if (err) reject(err);
                    else resolve(movie);
                })
            })
        },

        countDocuments: (root: any) => {
            const count = new Promise((resolve, reject) => {
                Movie.count((err: any, movie: unknown) => {
                    if (err) reject(err);
                    else resolve(movie);
                })
            })
            return {
                total: count
            };
        },
    },

    Mutation: {
        thumbsUpById: (root: any, { id }: byIdArgs) => {
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
        thumbsDownById: (root: any, { id }: byIdArgs) => {
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

    type NumberOfMovies {
        total: Int!
    }

    type Query {
        movieById(id: ID!): Movie
        countDocuments: NumberOfMovies!
        searchAndFilter(filterGenre: String! limit: Int! page: Int! order: Int!, sortOn: String! word: String!): [Movie!]
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