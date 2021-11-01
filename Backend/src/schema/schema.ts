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
        searchAndFilter: (_: any, { filterGenre, limit, page, order, sortOn, word }: searchAndFilterArgs) => {
            const skips: number = limit * (Number(page) - 1);
            let orderNum: number;
            if (order != 1 && order != -1) {
                orderNum = 1 //default sort ASC if bad input
            }
            else {
                orderNum = order;
            }
            const movies = new Promise((resolve, reject) => {
                let result = Movie.find({ title: { $regex: word, $options: '$i' }, genre: { $regex: filterGenre, $options: '$i' } },
                    (err: Error, movies: unknown) => {
                        if (err) reject(err);
                        else resolve(movies);
                    });
                if (sortOn === 'year') {
                    result.sort({ "year": orderNum }).skip(skips).limit(limit)
                } else {
                    result.sort({ "title": orderNum }).skip(skips).limit(limit)
                }
            })
            const count = new Promise((resolve, reject) => {
                Movie.count({ title: { $regex: word, $options: '$i' }, genre: { $regex: filterGenre, $options: '$i' } }, (err: Error, movie: unknown) => {
                    if (err) reject(err);
                    else resolve(movie);
                })
            })
            return {
                movies: movies,
                pages: count
            }
        },

        movieById: (_: any, { id }: byIdArgs) => {
            return new Promise((resolve, reject) => {
                Movie.findOne({ _id: id }, (err: Error, movie: unknown) => {
                    if (err) reject(err);
                    else resolve(movie);
                })
            })
        },
    },

    Mutation: {
        thumbsUpById: (_: any, { id }: byIdArgs) => {
            return new Promise((resolve, reject) => {
                Movie.findOneAndUpdate(
                    { _id: id },
                    { $inc: { thumbsUp: 1 } },
                    { new: true },
                    (err: Error, movie: unknown) => {
                        if (err) reject(err);
                        else resolve(movie);
                    }
                )
            })
        },
        thumbsDownById: (_: any, { id }: byIdArgs) => {
            return new Promise((resolve, reject) => {
                Movie.findOneAndUpdate(
                    { _id: id },
                    { $inc: { thumbsDown: 1 } },
                    { new: true },
                    (err: Error, movie: unknown) => {
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

    type SearchResult {
        movies: [Movie!]
        pages: Int!
    }

    type Query {
        movieById(id: ID!): Movie
        searchAndFilter(filterGenre: String! limit: Int! page: Int! order: Int!, sortOn: String! word: String!): SearchResult!
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