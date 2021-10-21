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
             movies:(root: any)=>{
                return new Promise((resolve,reject)=>{
                    Movie.find((err: any, movies: unknown)=>{
                        if(err) reject(err);
                        else resolve(movies);
                    })
                })
            },
            movieById:(root: any,{id}: any)=>{
                return new Promise((resolve,reject)=>{
                    Movie.findOne({_id:id},(err: any,movie: unknown)=>{
                    if(err) reject(err);
                    else resolve(movie);
                })
            })
        }
    }, 

    Mutation: { //DENNE FUNKER IKKE ENDA
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


    type Query {
        movies: [Movie!]!
        movieById(id: ID!): Movie
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