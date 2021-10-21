const { gql } = require("apollo-server");
//import gql from 'apollo-server';

//DENNE KAN SLETTES NÅR VI VÅR TIL Å KJØRE QUERIES IGJEN
//ER INTEGRERT I RESOLVERS

export default gql`

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

//module.exports = { defs };

