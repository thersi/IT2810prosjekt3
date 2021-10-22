//import Movie from '../model'
const { Movie, IMovie, MovieSchema } = require('../model')
const { gql } = require("apollo-server");
import { makeExecutableSchema } from '@graphql-tools/schema';



// DENNE KAN BYTTE NAVN TIL SCHEMA. INKLUDERER BÅDE RESOLVERS OG TYPEDEFS. 

const resolvers = {
    Query: {
        /*          movies () { //prøv å endre denne til ny logikk
                    return Movie.find()
                    .then((movie: any[]) => {
                        return movie.map((r: { _doc: any; }) => ({...r._doc}))
                    })
                    .catch((err: any) => {
                        console.error(err)
                    })
                }
            },  */
        movies: (root: any, {limit}:any, {offset}:any) => {
            return new Promise((resolve, reject) => {
                Movie.find((err: any, movies: unknown) => {
                    if (err) reject(err);
                    else resolve(movies);
                }).limit(limit)
            })
        },
        containsString: (root: any, { word }: any) => {
            return new Promise((resolve, reject) => {
                Movie.find({ title: { $search: word } }, (err: any, movies: unknown) => {
                    if (err) reject(err);
                    else resolve(movies);
                }).limit(5)
            })
        },

        sortedByTitleAsc: (root: any, {limit}:any) => {
            return new Promise((resolve, reject) => {
                Movie.find((err: any, movies: unknown) => {
                    if (err) reject(err);
                    else resolve(movies);
                }).sort({ "title": 1 }).limit(limit)
            })
        },
        sortedByTitleDesc: (root: any, {limit}:any) => {
            return new Promise((resolve, reject) => {
                Movie.find((err: any, movies: unknown) => {
                    if (err) reject(err);
                    else resolve(movies);
                }).sort({ "title": -1 }).limit(limit)
            })
        },
        sortedByYearDesc: (root: any, {limit}:any) => {
            return new Promise((resolve, reject) => {
                Movie.find((err: any, movies: unknown) => {
                    if (err) reject(err);
                    else resolve(movies);
                }).sort({ "year": -1 }).limit(limit)
            })
        },
        sortedByYearAsc: (root: any, {limit}:any) => {
            return new Promise((resolve, reject) => {
                Movie.find((err: any, movies: unknown) => {
                    if (err) reject(err);
                    else resolve(movies);
                }).sort({ "year": 1 }).limit(limit)
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
        /*             titleContains: (root: any,{word}: any) => {
                        return new Promise((resolve, reject)=>{
                            Movie.find( {title: word}, (err: any, movie: unknown) => {
                                if (err) reject (err);
                                else resolve(word);
                            })
                        })
                    } */

    },


    Mutation: { //DENNE FUNKER IKKE ENDA
        createMovie: (args: { title: String; thumbsUp: Number; year: Number; genre: [String]; actors: [String]; thumbsDown: Number; }) => {
            const { title, thumbsUp, year, genre, actors, thumbsDown } = args
            const movieObj = new Movie({
                title,
                thumbsUp,
                year,
                genre,
                actors,
                thumbsDown
            })
            return movieObj.save()
                .then((result: { _doc: any; }) => {
                    return { ...result._doc }
                })
                .catch((err: any) => {
                    console.log(err)
                })
        },
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

/* export const UserInput = new GraphQLInputObjectType({
    name: 'UserInput',
    fields: () => ({
        _id: { type: GraphQLString },
        title: { type: new GraphQLNonNull(GraphQLString) }, //* Mandatory field
        thumbsUp: { type: new GraphQLNonNull(GraphQLInt) }, //* Mandatory field
        year: { type: new GraphQLNonNull(GraphQLInt) },
        genre: { type: new GraphQLNonNull(new GraphQLList(GraphQLString))},
        actors: { type: GraphQLString },
        thumbsDown: { type: new GraphQLNonNull(GraphQLInt) }
    })
}); */

const typeDefs = gql`

    type Movie {
        _id: ID!
        title: String!
        thumbsUp: Int!
        year: Int!
        genre: [String!]!
        actors: [String!]
        thumbsDown: Int!
    }

    input CreateMovieInput {
        title: String!
        thumbsUp: Int!
        year: Int!
        genere: [String!]!
        actors: [String]
        thumbsDown: Int!
    }
    input paginationInput{
        limit: Int!
        offset: Int!
    }


    type Query {
        movies(limit: Int! offset: Int!): [Movie!]!
        containsString(word: String!): [Movie!]!
        movieById(id: ID!): Movie
        movieByTitle(title: String!): Movie
        sortedByTitleAsc(limit: Int!): [Movie!]!
        sortedByTitleDesc(limit: Int!): [Movie!]!
        sortedByYearAsc(limit: Int!): [Movie!]!
        sortedByYearDesc(limit: Int!): [Movie!]!
    }

    type Mutation {
       createMovie(input: CreateMovieInput!): Movie!
       thumbsUpById(id: ID!): Movie
       thumbsDownById(id: ID!): Movie
    }
`
//export default{ resolvers };
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

export default (schema);