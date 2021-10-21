//import Movie from '../model'
const Movie = require('../model')
const { gql } = require("apollo-server");
import { makeExecutableSchema } from '@graphql-tools/schema';

// DENNE KAN BYTTE NAVN TIL SCHEMA. INKLUDERER BÅDE RESOLVERS OG TYPEDEFS. 

const resolvers = {
    Query: {
        movies () { //prøv å endre denne til ny logikk
            return Movie.find()
            .then((movie: any[]) => {
                return movie.map((r: { _doc: any; }) => ({...r._doc}))
            })
            .catch((err: any) => {
                console.error(err)
            })
        }
    },
    Mutation: { //prøvd å endre denne men får feilmelding i apollo på localhost
        createMovie: (args: { title: String; thumbsUp: Number; year: Number; genre: [String]; actors: [String]; thumbsDown: Number; }) => {
            const {title, thumbsUp, year, genre, actors, thumbsDown} = args
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
                    return{ ...result._doc}
                })
                .catch((err: any) => {
                    console.log(err)
                })
        }
    }
}

const typeDefs = gql`

    type Movie {
        _id: ID!
        title: String!
        thumbsUp: Int!
        thumbsDown: Int!
        year: Int!
        genere: [String!]!
        actors: [String!]
    }

    input CreateMovieInput {
        title: String!
        thumbsUp: Int!
        thumbsDown: Int!
        year: Int!
        genere: [String!]!
    }


    type Query {
        movies: [Movie!]!
    }

    type Mutation {
       createMovie(input: CreateMovieInput!): Movie!
    }
`
//export default{ resolvers };
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

export default(schema);