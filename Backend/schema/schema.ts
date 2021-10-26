const { Movie, IMovie, MovieSchema } = require('../model')
//const { gql } = require("apollo-server");
import {gql} from 'apollo-server'
import { makeExecutableSchema } from '@graphql-tools/schema';


type paginationWithFilterArgs = {
    page: number;
    limit: number;
    word: string;
    order: number;
    sortOn: string;
};


const resolvers = {
    Query: {
        movies: (root: any, {limit, page, order, sortOn}: any) => {
            const skips: number = limit * (Number(page) - 1);
            let orderNum: number;
            if (order!= 1 && order!=-1){
                orderNum = 1 //default sort ASC if bad input
            }
            else {
                orderNum = order;
            }
            if (sortOn === "year") {
                return new Promise((resolve, reject) => {
                    Movie.find((err: any, movies: unknown) => {
                        if (err) reject(err);
                        else resolve(movies);
                    }).sort({ "year": orderNum }).skip(skips).limit(limit);
                })
            }
            else {
                return new Promise((resolve, reject) => { // Kind of default to sort on title
                    Movie.find((err: any, movies: unknown) => {
                        if (err) reject(err);
                        else resolve(movies);
                    }).sort({ "title": orderNum }).skip(skips).limit(limit);
                })
            }
            
        },

        containsString: (root: any, args: paginationWithFilterArgs) => {
            const page = args.page;
            const limit = args.limit;
            const word = args.word
            const skips: number = limit * (Number(page) - 1);
            const order = args.order;
            const sortOn = args.sortOn;
            
            let orderNum: number;
            if (order!= 1 && order!=-1){
                orderNum = 1 //default sort ASC if bad input
            }
            else {
                orderNum = order;
            }

            if (sortOn === "year"){
                return new Promise((resolve, reject) => {
                    Movie.find({ title: { $regex: word, $options: '$i' } },
                        (err: any, movies: unknown) => {
                            if (err) reject(err);
                            else resolve(movies);
                        }).sort({ "year": orderNum }).skip(skips).limit(limit);
                })
            }
            else {
                return new Promise((resolve, reject) => {
                    Movie.find({ title: { $regex: word, $options: '$i' } },
                        (err: any, movies: unknown) => {
                            if (err) reject(err);
                            else resolve(movies);
                        }).sort({ "title": orderNum }).skip(skips).limit(limit);
                })
            }
        },

        filterOnGenre: (root: any, {filterGenre, limit, page, order, sortOn}:any) => {
            const skips: number = limit * (Number(page) - 1);
            let orderNum: number;
            if (order!= 1 && order!=-1){
                orderNum = 1 //default sort ASC if bad input
            }
            else {
                orderNum = order;
            }
            if (sortOn==="year"){
                return new Promise((resolve, reject) => {
                    Movie.find({ genre: { $regex: filterGenre, $options: '$i' } },
                        (err: any, movies: unknown) => {
                            if (err) reject(err);
                            else resolve(movies);
                        }).sort({ "year": orderNum }).skip(skips).limit(limit);
                })
            }
            else {
                return new Promise((resolve, reject) => {
                    Movie.find({ genre: { $regex: filterGenre, $options: '$i' } },
                        (err: any, movies: unknown) => {
                            if (err) reject(err);
                            else resolve(movies);
                        }).sort({ "title": orderNum }).skip(skips).limit(limit);
                })
            }
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
        movies(limit: Int! page: Int! order: Int! sortOn: String!): [Movie!]!
        containsString(limit: Int! page: Int! word: String! order: Int! sortOn: String!): [Movie!]
        movieById(id: ID!): Movie
        movieByTitle(title: String!): Movie
        filterOnGenre(filterGenre: String! limit: Int! page: Int! order: Int!, sortOn: String!): [Movie!]
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